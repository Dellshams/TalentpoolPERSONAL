const db = require('../../../Models');
const employerss = db.Employer;
const mainuser = db.User;
const company_type = db.Company_category;
//function for loading all data
async function employerInfo(req, res) {
  const getemployer = await employerss.findOne({
    where: {
      user_id: req.session.userId,
    },
    include: [mainuser, company_type],
  });
  const allEmployees = await db.Employee.count();
  const employeeContacted = await db.Team.count({
    where: {
      employer_id: req.session.employerId,
    },
  });
  const employeeEmployed = await db.Team.count({
    where: {
      employer_id: req.session.employerId,
      status: 'Accepted',
    },
  });
  //console.log(getemployer);
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

  var dashboard = { allEmployees, employeeContacted, employeeEmployed };

  const employerbasicInfo = {
    ...userIdentity,
    employerInfo,
    userIndustry,
    dashboard,
  };
  return employerbasicInfo;
}

//the main module
module.exports = {
  employerDashboard: (req, res) => {
    res.render('Pages/employer-dashboard', {
      success: req.flash('success'),
      pageName: 'Employer Dashboard',
    });
  },

  employerProfile: (req, res) => {
    res.render('Pages/employer-profile-page', {
      pageName: 'Employer Dashboard',
    });
  },

  employerMessages: (req, res) => {
    res.render('Pages/employer-messages', {
      pageName: 'Employer Messages',
    });
  },

  employerCreateProfile: async (req, res) => {
    const companyCat = await company_type.findAll();
    res.render('Pages/employer-profile-creation', {
      success: req.flash('success'),
      pageName: 'Create Profile',
      data: companyCat,
    });
  },

  employerCompany: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-company', {
      pageName: 'Company Profile',
      EmployerInfo: employerbasicInfo,
    });
  },

  uploaddocsuccess: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/upload-doc-success', {
      pageName: 'Document Uploaded',
      EmployerInfo: employerbasicInfo,
    });
  },

  uploaddocfailure: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/upload-doc-failure', {
      pageName: 'Document Disapproved',
      EmployerInfo: employerbasicInfo,
    });
  },

  employerProfile: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    const companyCat = await company_type.findAll();
    res.render('Pages/employer-profile-page', {
      pageName: 'Profile',
      EmployerInfo: employerbasicInfo,
      data: companyCat,
    });
  },

  employerDashboardSettings: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-dash-settings.ejs', {
      pageName: 'Employer Dashboard - Settings',
      EmployerInfo: employerbasicInfo,
    });
  },

  employerDashboardSupport: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-dash-support', {
      pageName: 'Employer Dashboard',
      EmployerInfo: employerbasicInfo,
    });
  },

  employerEmployeeGallery: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-employees-gallery', {
      pageName: 'Employee Gallery',
      EmployerInfo: employerbasicInfo,
    });
  },

  employerAddTeam: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-add-a-team', {
      pageName: 'Employer - Add Team',
      EmployerInfo: employerbasicInfo,
    });
  },
  employerCompanyDashboard: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-company-dashboard', {
      pageName: 'Employer Dashboard',
      EmployerInfo: employerbasicInfo,
    });
  },
  employerCertificate: async (req, res) => {
    const employerbasicInfo = await employerInfo(req, res);
    res.render('Pages/employer-certificate', {
      pageName: 'Upload Certificate',
      EmployerInfo: employerbasicInfo,
    });
  },
};
