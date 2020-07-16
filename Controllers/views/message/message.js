/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const model = require('../../../Models/index');
const {
    errorResMsg,
    successResMsg
} = require('../../../Utils/response');

const {
    Op
} = Sequelize;


module.exports = {
    adminMessagePage: async (req, res) => {
        try {
            //Get admin chat users
            const adminChatUsers = await model.Admin.findAll({
                raw: true,
                attributes: ['user_id', 'first_name', 'last_name'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get employer chat users
            const employerChatUsers = await model.Employer.findAll({
                raw: true,
                attributes: ['user_id', 'employer_name', 'employer_photo'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get employee chat users
            const employeeChatUsers = await model.Employee.findAll({
                raw: true,
                attributes: ['user_id', 'first_name', 'last_name', 'image'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            const allusers = [
                ...adminChatUsers,
                ...employeeChatUsers,
                ...employerChatUsers,
            ];

            // console.log('admin', adminChatUsers);
            // console.log('Employer', employerChatUsers);
            // console.log('Employee', employeeChatUsers);

            res.status(200).render('Pages/admin-dash-messages', {
                pageName: 'Admin Messages',
                pageTitle: 'TalentPool | Admin Message',
                userId: req.session.userId,
                allusers: allusers,
                path: '/admin/message',
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success'),
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },

    employerMessagePage: async (req, res) => {

        try {

            let employerId = req.session.employerId
            //Get employer chat users
            const employerChatUsers = await model.Employer.findAll({
                attributes: ['user_id', 'employer_name', 'employer_photo'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get admin chat users
            const adminChatUsers = await model.Admin.findAll({
                attributes: ['user_id', 'first_name', 'last_name'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get employee chat users
            const employeeChatUsers = await model.Employee.findAll({
                attributes: ['user_id', 'first_name', 'last_name', 'image'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            // console.log('admin', adminChatUsers);
            // console.log('Employer', employerChatUsers);
            // console.log('Employee', employeeChatUsers);

            res.status(200).render('Pages/employer-messages', {
                pageName: 'Employer Messages',
                pageTitle: 'TalentPool | Employer Message',
                EmployerInfo: req.session.details,
                path: '/employer/message',
                employerChatUsers,
                adminChatUsers,
                employeeChatUsers,
                dashboardPath: `${URL}employee/dashboard/${employerId}`,
                profilePath: `${URL}employee/profile/${employerId}`,
                portfolioPath: `${URL}employee/portfolio/${employerId}`,
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success'),
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },

    employeeMessagePage: async (req, res) => {
        const {
            employeeId
        } = req.session;
        try {
            //Get employee chat users
            const employeeChatUsers = await model.Employee.findAll({
                attributes: ['user_id', 'first_name', 'last_name', 'image'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get employer chat users
            const employerChatUsers = await model.Employer.findAll({
                attributes: ['user_id', 'employer_name', 'employer_photo'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });

            //Get admin chat users
            const adminChatUsers = await model.Admin.findAll({
                attributes: ['user_id', 'first_name', 'last_name'],
                include: [{
                    model: model.User,
                    attributes: ['role_id'],
                }, ],
            });
            // console.log('admin', adminChatUsers);
            // console.log('Employer', employerChatUsers);
            // console.log('Employee', employeeChatUsers);

            res.status(200).render('Pages/employee-messages', {
                pageName: 'Employer Messages',
                pageTitle: 'TalentPool | Employee Message',
                userId: req.session.userId,
                allusers: allusers,
                path: '/employee/message',
                dashboardPath: `${URL}employee/dashboard/${employeeId}`,
                profilePath: `${URL}employee/profile/${employeeId}`,
                portfolioPath: `${URL}employee/portfolio/${employeeId}`,
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success'),
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },

    adminChatMessages: async (req, res) => {
        try {
            const {
                senderID,
                receiverID
            } = req.params;

            console.log(senderID, receiverID);

            const usersChatMessages = await model.Chat.findAll({
                raw: true,
                where: {
                    // eslint-disable-next-line max-len
                    [Op.or]: [{
                            user_id: senderID,
                        },
                        {
                            user_id: receiverID,
                        },
                        {
                            receiver_id: senderID,
                        },
                        {
                            receiver_id: receiverID,
                        },
                    ],
                },
            });
            console.log(usersChatMessages);

            res.status(200).send({
                data: usersChatMessages
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },

    employerChatMessages: async (req, res) => {
        try {
            const {
                senderID,
                receiverID
            } = req.params;

            const usersChatMessages = await model.Chat.findAll({
                where: {
                    // eslint-disable-next-line max-len
                    [Op.or]: [{
                            user_id: senderID,
                        },
                        {
                            user_id: receiverID,
                        },
                        {
                            receiver_id: senderID,
                        },
                        {
                            receiver_id: receiverID,
                        },
                    ],
                },
            });
            console.log(usersChatMessages);

            res.status(200).render('Pages/employer-messages', {
                pageName: 'Admin Messages',
                pageTitle: 'TalentPool | Admin Message',
                usersChatMessages,
                path: '/employer/message',
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success'),
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },
    employeeChatMessages: async (req, res) => {
        try {
            const {
                senderID,
                receiverID
            } = req.params;

            const usersChatMessages = await model.Chat.findAll({
                where: {
                    // eslint-disable-next-line max-len
                    [Op.or]: [{
                            user_id: senderID,
                        },
                        {
                            user_id: receiverID,
                        },
                        {
                            receiver_id: senderID,
                        },
                        {
                            receiver_id: receiverID,
                        },
                    ],
                },
            });
            console.log(usersChatMessages);

            res.status(200).render('Pages/employee-messages', {
                pageName: 'Admin Messages',
                pageTitle: 'TalentPool | Admin Message',
                usersChatMessages,
                path: '/employee/message',
                error: req.flash('error'),
                errors: req.flash('errors'),
                success: req.flash('success'),
            });
        } catch (err) {
            console.log(err);
            return errorResMsg(res, 500, 'Ops!, An error occurred');
        }
    },
};