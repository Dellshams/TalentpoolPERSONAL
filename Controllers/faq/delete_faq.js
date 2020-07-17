const model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');

exports.delete_faq = async (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      return errorResMsg(res, 500, 'ID not specified');
    }
    const query = await model.Faq.findOne({
      where: { id },
    });
    const data = await query;
    if (data === null) {
      return errorResMsg(res, 404, 'FAQ not found with given ID');
    }
    try {
      await model.Faq.destroy({
        where: { id },
        force: true,
      });
      return successResMsg(res, 200, 'OK! Deleted');
      // res.render('Pages/faq',{'pageName':'Delete FAQ'})
    } catch (err) {
      return errorResMsg(res, 404, 'Delete operation failed');
    }
  } catch (err) {
    return errorResMsg(res, 500, 'Internal Error Occured');
  }
};
