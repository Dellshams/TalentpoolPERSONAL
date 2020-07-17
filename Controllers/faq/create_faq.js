const  express  = require('express');
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');
exports.createFaq = async (req, res) => {
    try {
    const {category, question, answer} = req.body;
      const newFaq = {
          category: category,
          question: question,
          answer: answer,
          user_id: req.session.userId
      }
      let createdFaq = await model.Faq.create(newFaq)
      return successResMsg(res,200,"OK! Created");

}  catch (error) {
    return errorResMsg(res, 500, 'An error occurred while creating FAQs');
  }
}
