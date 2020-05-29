var cron = require('node-cron');
const stripe = require('stripe')('sk_test_FQkgogx8zMA3IYjubruKHZHT00rLNgcX9X');
const con = require('../../config/db');

const historicStatus = require('../../modules/hst_sta/historicStatus.model');
const user = require('../../modules/user/user.model');
const payment = require('../../modules/payment/payment.model');
const sendgrid = require('../emails/sendgrid');

let payments = [];
let withdrawals = [];

var service = null;

var firstTime = true;

async function checkPaymentStatus(payment){

    try {
        const charge = await stripe.charges.retrieve(
            //'ch_1GmLVYBDr8hNIY5zzDHSuknj'            
            payment.transactionID
        );

        if(charge.status === 'succeeded'){
            const newStatus = await historicStatus.createPaymentStatus(con, {
                paymentID: payment.paymentID,
                statusID: "(SELECT sta_id FROM STATUS WHERE sta_name = 'approved')"
            });
            
            const userPointsUpdate = await user.addPoints(con, payment.userID, {
                points: payment.points
            });

            var emailTemplateID = '';
            if(payment.preferredLanguage === 'en-us'){
              emailTemplateID = 'd-3bd839d71d3d40799cfe72e6735aec1b'
            }
            else {
              emailTemplateID = "d-f779fdf9df3748408c487dab734db84d"
            }

            if(userPointsUpdate === 'Points successfully updated.'){
                await sendgrid.sendEmail({
                    to: payment.userEmail,
                    templateID: emailTemplateID,
                    atributes: {
                        user: payment.userName,
                        numberPoints: payment.points
                    }
                });

                deletePayment(payment);
                console.log("PAYMENT CHECKED.");
                return 'Transaction approved.';
            }
            
        };

        return "Transaction not yet approved.";

    } catch (error) {
        return "Error. Couldn't verify transaction.";
    }

}

async function checkWithdrawalStatus(transactionID){
    
}

function addPayment(paymentData){
    payments.push(paymentData);
}

function deletePayment(payment){
    payments.splice(payments.indexOf(payment), 1);
}

async function checkPayments(){
    console.log("checking payments...");
    var i = 0;
    while(payments.length > 0){
        var paymentApproved = await checkPaymentStatus(payments[i]);
        i;
    }    
}

async function checkWithdrawals(){
    console.log("checking withdrawals...");
}

async function startService(){
    service = cron.schedule('*/5 * * * *', async () =>  {
        if(!firstTime){
            await checkPayments();
            //await checkWithdrawals();
        }
        else {
            firstTime = false;
        }
    });
    service.start();
}

async function obtaintPendingPayments(){
    try {        
        var response = await payment.getPendingPayments(con);
    } catch (error) {
        console.log(error);
    }
     
}

function initializeServices(){    
    obtaintPendingPayments();
    startService();    
    console.log("Services have been started...");
}

exports.initializeServices = initializeServices
exports.addPayment = addPayment