module.exports = {
  employerSignup: (req, res) => {
    const { isLoggedIn, employerId } = req.session;

    if (isLoggedIn && employerId) {
      res.redirect(`/employer/dashboard/${req.session.employeeId}`);
    } else if (isLoggedIn && !employerId) {
      return res.redirect('/employer/profile/create');
    }

    return res.render('Pages/employer-sign-up', {
      pageName: 'Employer Registration',
      error: req.flash('error'),
      errors: req.flash('errors'),
      success: req.flash('success'),
    });
  },

  employerSignIn: (req, res) => {
    const { isLoggedIn, employerId } = req.session;

    if (isLoggedIn && employerId) {
      res.redirect('/employer/dashboard/');
    } else if (isLoggedIn && !employerId) {
      return res.redirect('/employer/profile/create');
    }
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
      [message] = message;
    } else {
      message = null;
    }
    res.render('Pages/employer-signin', {
      path: '/employer/login',
      pageName: 'Employer Login',
      errorMessage: message,
      success,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  },
};
