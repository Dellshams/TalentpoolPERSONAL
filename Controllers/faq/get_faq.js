const model = require('../../Models');
const { errorResMsg } = require('../../Utils/response');

exports.get_faq_admin = async (req, res) => {
  try {
    if (req.session.isLoggedIn === undefined) {
      res.redirect('/admin/login');
    }

    const query = await model.Faq.findAll({
      attributes: ['question', 'answer', 'category', 'id', 'blocked'],
    });

    const data = await query;
    return res.render('Pages/admin-faq.ejs', {
      message: undefined, data, pageName: 'FAQ', path: 'faq', isLoggedIn: req.session.isLoggedIn, currentUser: req.session.currentUser,
    });
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
};

exports.get_faq = async (req, res) => {
  try {
    const query = await model.Faq.findAll({
      attributes: ['question', 'answer', 'category', 'blocked'],
    });

    const data = await query;

    return res.render('Pages/faq.ejs', {
      data, pageName: 'FAQ', path: 'faq', isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
};
