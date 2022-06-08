const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'pruebashootoff@gmail.com',
      pass: 'aieamhsqwxfokgsl'
    }
})

transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Mail config is correct');
});


const sendPurchaseMail = (to,order_num) => {

    const mailOptions = {
        from: `"Shoot Off" <pruebashootoff@gmail.com>`,
        to: to,
        subject: `Your purcharse nro ${order_num} has been added`,
        html:  `<h1>Su pedido ha sido agregado con numero de orden: ${order_num} </h1>
        <h3>Que lo disfrutes!</h3>`,
    }

    transporter.sendMail(mailOptions);

}

module.exports = {sendPurchaseMail}