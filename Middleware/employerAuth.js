const db = require('../Models');
const employerss = db.Employer;
const mainuser = db.User;
const company_type = db.Company_category;

module.exports = {
  auth_main: async (req, res, next) => {
    //get this token to check for the employer id
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
      req.session.block = getuser.dataValues.role_id;
      if (
        !getuser ||
        req.session.usertype != 'ROL-EMPLOYER' ||
        req.session.block === 'block'
      )
        return res.redirect('/employer/login');
      next();
    } catch (error) {
      res.send(error);
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
      // const myobj = {
      //   Name:getemployer.dataValues.employer_name

      // }
      // const dta = getemployer.dataValues;
      //actually i can use foreach here or map but guy man don tire
      var {
        id,
        CompanyCategoryCategoryId,
        UserUserId,
        User,
        Company_category,
        ...employerInfo
      } = getemployer.dataValues;
      var {
        id,
        RoleRoleId,
        block,
        password,
        auth_id,
        status,
        verification_token,
        provider,
        role_id,
        resetPasswordToken,
        resetPasswordExpire,
        ...userIdentity
      } = getemployer.dataValues.User.dataValues;
      var {
        id,
        RoleRoleId,
        ...userIndustry
      } = getemployer.dataValues.Company_category.dataValues;

      const employerbasicInfo = {
        ...userIdentity,
        employerInfo,
        userIndustry,
      };

      req.session.details = employerbasicInfo;
      next();
    } catch (error) {
      res.send(error);
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
