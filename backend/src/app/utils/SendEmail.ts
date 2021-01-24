import nodemailer from 'nodemailer';

import auth from '../../config/auth';

const SendMail = ({to, subject, html}) => {

    const transporter = nodemailer.createTransport({
        host: auth.host,
        port: auth.port,
        secure: auth.secure,
        auth: {
            user: auth.user,
            pass: auth.pass
        },
        tls: {
          rejectUnauthorized: false,
        },
    });
    
    transporter.sendMail({
        from: auth.user,
        to: to,
        subject: subject,
        html: html
    }).then(message =>{
        console.log(message);
    }).catch(err => {
        console.log(err);
    });

};

export default SendMail;