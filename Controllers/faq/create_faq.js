const  express  = require('express');
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');

exports.createFaq = async (req, res) => {
    const {category, question, answer} = req.body;
    try {
    const newFaq = {
        category: category,
        question: question,
        answer: answer,
        user_id: '3b107838-0742-4d36-9b9a-9955551039da'
    }
    let createdFaq = await model.Faq.create(newFaq)

    // res.render('Pages/admin-faq', {faq: createdFaq, pageName:'Admin FAQ', path: 'admin-faq'})
    res.redirect('/v1/admin/faq')
}  catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
}
