/* --------------------     SENDGRID IMPORTS ------------------------ */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = {

    async sendEmail(data){
        const msg = {
            to: data.to,
            from: process.env.EMAIL_SENDER,
            templateId: data.templateID,
            dynamic_template_data: data.atributes,
          };
    
        try {
            const email = await sgMail.send(msg);    
            return 'Emails successfully sent.';
        } catch (error) {
            console.dir(err);
            return "ERROR. Couldn't send email.";
        }
    }

}