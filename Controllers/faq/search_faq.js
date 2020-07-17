const model = require('../../Models');
const { errorResMsg } = require('../../Utils/response');

// exports.search_faq_get = async(req, res)=>{
//   res.render('Pages/search_faq');
// }

exports.search_faq_post = async (req, res) => {
  try {
    const { search_key } = req.body;
    const data = await model.sequelize.query('SELECT question,answer,category,blocked from faqs where match(question,answer) against (:search_key IN BOOLEAN MODE) group by id', {
      replacements: { search_key },
    });
    const new_data = new Set();
    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].length; j += 1) {
        new_data.add(data[i][j]);
      }
    }
    const arr = Array.from(new_data);
    return res.render('Pages/faq', { data: arr, pageName: 'faq', isLoggedIn: req.session.isLoggedIn });
  } catch (error) {
    return errorResMsg(res, 500, 'An error occured while querying Database');
  }
};
