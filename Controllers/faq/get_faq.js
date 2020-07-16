const  express  = require('express');
const  ejs  = require('ejs')
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');
const Sequelize = require('sequelize')

exports.get_faq_admin = async (req, res)=>{
  try {
    const query = await model.Faq.findAll({
      attributes: ['question','answer','category','id','blocked']
    });

    const data = await query;

    return res.render("Pages/admin-faq.ejs",{data:data,pageName:"FAQ",path:"admin-dashboard"});
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
};


exports.get_faq = async (req, res)=>{
  try {
    const query = await model.Faq.findAll({
      attributes: ['question','answer','category','blocked']
    });

    const data = await query;

    return res.render("Pages/faq.ejs",{data:data,pageName:"FAQ",path:"admin-dashboard"});
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
};
