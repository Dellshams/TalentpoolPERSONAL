const  express  = require('express');
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');


exports.updateFaq = async (req, res) => {
  try{
    const {id,state, question, answer, category } = req.body;
    if(question === undefined){
      await model.Faq.update({blocked:state},{
        where:{
          id,
        }
      })
      const data = await model.Faq.findAll({})
      res.render('Pages/admin-faq',{pageName:'FAQ',path:'faq',data:data,isLoggedIn:req.session.isLoggedIn})
    }
    else{
          await model.Faq.update({
            question,
            answer,
            category
          }, { where: { id } });
          return successResMsg(res,200,"OK! Updated");
    }
  } catch (err){
    return errorResMsg(res,500,"Internal Server Error Occured");
  }
}
