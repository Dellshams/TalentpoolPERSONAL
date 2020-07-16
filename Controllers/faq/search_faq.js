const  express  = require('express');
const  ejs  = require('ejs')
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');
const { db } = require('../../Models')
const { Sequelize } = require("sequelize")

// exports.search_faq_get = async(req, res)=>{
//   res.render('Pages/search_faq');
// }



exports.search_faq_post = async (req, res)=>{
  try {
    const { search_key } = req.body;
    const data = await model.sequelize.query("SELECT question,answer,category,blocked from faqs where match(question,answer) against (:search_key IN BOOLEAN MODE) group by id",{
      replacements: {search_key: search_key},
    });
    let new_data = new Set()
    for(i in data){
      for(j in data[i]){
        new_data.add(data[i][j]);
      }
    }
    arr = Array.from(new_data)
    return res.render('Pages/faq',{data:arr,pageName:'FAQ'})
  } catch (error) {
    return errorResMsg(res, 500, error);
  }
};
