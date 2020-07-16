const  express  = require('express');
const  model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');


exports.updateFaq = async (req, res) => {
    const {id,state, question, answer, category } = req.body;
    if(question === undefined){
      await model.Faq.update({blocked:state},{
        where:{
          id,
        }
      })
      const data = await model.Faq.findAll({})
      res.render('Pages/admin-faq',{pageName:'FAQ',path:'dfwqf',data:data})
    }
    else{
          await model.Faq.update({
            question,
            answer,
            category
          }, { where: { id } });

          const query = await model.Faq.findOne({ where: { id } });

          const data = await query;

          if (!data) {
            return errorResMsg(res, 404, 'Faq not found');
          }
          return successResMsg(res, 200, data);
    };
}
