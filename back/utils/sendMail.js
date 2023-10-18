const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_EMAIL || 'jamshidbek536@gmail.com', // generated ethereal user
            pass: process.env.SMPT_PASSWORD || 'subhanalloh1122' // generated ethereal password
        }
    });

    const mailOptions = {
        from: process.env.SMPT,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    const info = await transporter.sendMail(mailOptions);

    return info;
}

module.exports = sendMail;