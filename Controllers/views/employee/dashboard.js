/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
// const employeeController = require('../../employee/employee-profile');
exports.getEmployeeMessages = (req, res) => {
  const { employeeId } = req.session;
  let userId;
  const {
    passport,
  } = req.session;
    // console.log({ passport });

  if (passport) {
    const { passport: { user } } = req.session;
    userId = user.userId || user.user_id;
    // console.log(userId);
  } else {
    userId = req.session.userId;
  }

  res.render('Pages/employee-messages', {
    pageTitle: 'Talent Pool | Messages',
    userId,
    profileImage: req.session.profileImage,
    dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
    profilePath: `${URL}/employee/profile/${employeeId}`,
    portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
    path: '/employee/message',
  });
};
// exports.getEmployeePortfolio = (req, res) => {
//   const { employeeId } = req.session;
//   res.render('Pages/employee-portfolio', {
//     pageTitle: 'Talent Pool | Portfolio',
//     dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
//     profilePath: `${URL}/employee/profile/${employeeId}`,
//     portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
//     path: '/employee/message',
//   });
// };

// exports.getEmployeeSupport = (req, res) => {
//   res.render('Pages/employee-support', {
//     pageTitle: 'Talent Pool | Support',
//     path: '/employee/support',
//   });
// };
exports.getEmployeeSettings = (req, res) => {
  const { employeeId } = req.session;
  let userId;
  const {
    passport,
  } = req.session;
    // console.log({ passport });

  if (passport) {
    const { passport: { user } } = req.session;
    userId = user.userId || user.user_id;
    // console.log(userId);
  } else {
    userId = req.session.userId;
  }
  
 
  
  res.render('Pages/employee-settings', {
    userId,
    pageTitle: 'Talent Pool | Settings',
    profileImage: req.session.profileImage,
    dashboardPath: `${URL}/employee/dashboard/${employeeId}`,
    profilePath: `${URL}/employee/profile/${employeeId}`,
    portfolioPath: `${URL}/employee/portfolio/${employeeId}`,
    path: '/employee/Settings'
   
  });
};
// exports.getEmployeeEmployers = (req, res) => {
//   res.render('Pages/employee-employer', {
//     pageTitle: 'Talent Pool | Employers',
//     path: '/employee/employers',
//   });
// };
exports.getEmployeeProfileCreation = (req, res) => {
  const { isLoggedIn, employeeId, isProfileCreated, profileId } = req.session;

  const user = req.session.employeeuserData;

  if (isLoggedIn && employeeId) {
    res.redirect(`/employee/dashboard/${req.session.employeeId}`);
  } else if (profileId && isProfileCreated) {
    res.redirect(`/employee/dashboard/${req.session.profileId}`);
  } else {
    return res.render('Pages/employee-profile-creation', {
      success: req.query.success_message,
      errorMessage: req.query.error_message,
      pageTitle: 'TalentPool | Create Profile',
      path: '/employee/profile/create',
      user,
    });
  }
};
