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
            console.dir(error);
            return "ERROR. Couldn't send email.";
        }
    }

}