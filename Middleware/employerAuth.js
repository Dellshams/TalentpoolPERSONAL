const db = require('../Models');
const employerss = db.Employer;
const mainuser = db.User;
const company_type = db.Company_category;

module.exports = {
  auth_main: async (req, res, next) => {
    req.session.userId;
    if (!req.session.userId) return res.redirect('/employer/login');
    next();
  },
  auth_validuser: async (req, res, next) => {
    try {
      //first find if the user exist
      const getuser = await mainuser.findOne({
        where: {
          user_id: req.session.userId,
        },
      });
      //set the user type session
      req.session.usertype = getuser.dataValues.role_id;
      req.session.block = getuser.dataValues.block;
      if (!getuser) {
        return res.redirect('/employer/login');
      } else if (req.session.usertype != 'ROL-EMPLOYER') {
        return res.redirect('/employer/login');
      } else if (req.session.block === 1) {
        return res.redirect('/employer/login');
      } else {
        next();
      }
    } catch (error) {
      return res.redirect('/employer/login');
    }
  },
  auth_firstLogin: async (req, res, next) => {
    try {
      //check if user has created profile
      const getemployer = await employerss.findOne({
        where: {
          user_id: req.session.userId,
        },
        include: [mainuser, company_type],
      });
      //go back to file creation page
      if (getemployer) return res.redirect('/employer/dashboard');

      next();
    } catch (error) {
      return res.redirect('/employer/login');
    }
  },
  auth_valid_profile: async (req, res, next) => {
    try {
      //check if user has created profile
      const getemployer = await employerss.findOne({
        where: {
          user_id: req.session.userId,
        },
        include: [mainuser, company_type],
      });
      //go back to file creation page
      if (!getemployer) return res.redirect('/employer/profile/create');
      req.session.employerId = getemployer.dataValues.employer_id;
      req.session.status = getemployer.dataValues.verification_status;
      next();
    } catch (error) {
      return res.redirect('/employer/login');
    }
  },
  auth_pending: async (req, res, next) => {
    // now to check if the user has uploaded document
    if (req.session.status === 'Pending') {
      return res.redirect('/employer/certificate');
    }
    next();
  },
  auth_uploaded: async (req, res, next) => {
    if (req.session.status === 'Uploaded') {
      return res.redirect('/employer/dasboard/success');
    }
    next();
  },
  auth_disapproved: async (req, res, next) => {
    if (req.session.status === 'Disapproved') {
      return res.redirect('/employer/dashboard/failure');
    }

    next();
  },
  auth_approved: async (req, res, next) => {
    if (req.session.status === 'Approved') {
      return res.redirect('/employer/dashboard');
    }
    next();
  },
};
