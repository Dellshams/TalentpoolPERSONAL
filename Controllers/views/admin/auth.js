module.exports = {
  adminSignUp: (req, res) => {
    res.render('Pages/admin-signup', { pageName: 'Admin SignUp',isLoggedIn:req.session.isLoggedIn });
  },

  // adminLogin: (req, res) => {
  //   res.render('Pages/admin-login', { pageName: 'Admin Login' });
  // },
  adminLogin: (req, res) => {
    const {
      isLoggedIn, adminId,
    } = req.session;

    if (isLoggedIn && adminId) {
      res.redirect('/admin/dashboard/');
    }
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/admin-login', {
      path: '/admin-login',
      pageName: 'Admin Login',
      errorMessage: message,
      isLoggedIn,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
