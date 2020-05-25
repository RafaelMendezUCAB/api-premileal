var cron = require('node-cron');
const stripe = require('stripe')('sk_test_h4hCvDfHyNy9OKbPiV74EUGQ00jMw9jpyV');
const con = require('../../config/db');

const historicStatus = require('../../modules/hst_sta/historicStatus.model');
const user = require('../../modules/user/user.model');
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
                statusID: 8
            });
            
            const userPointsUpdate = await user.addPoints(con, payment.userID, {
                points: payment.points
            });

            if(userPointsUpdate === 'Points successfully updated.'){
                await sendgrid.sendEmail({
                    to: payment.userEmail,
                    templateID: 'd-3bd839d71d3d40799cfe72e6735aec1b',
                    atributes: {
                        user: payment.userName,
                        numberPoints: payment.points
                    }
                });

                deletePayment(payment);
                console.log("PAYMENT CHECKED");
                return 'Transaction approved.';
            }
            
        };

        return "Transaction not yet succeded.";

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
    for(var i = 0; i < payments.length; i++){
        await checkPaymentStatus(payments[i]);
    }    
    
}

async function checkWithdrawals(){
    console.log("checking withdrawals...");
}

async function startService(){
    service = cron.schedule('*/1 * * * *', async () =>  {
        if(!firstTime){
            console.log('Service status...'); 
            await checkPayments();
            await checkWithdrawals();
        }
        else {
            firstTime = false;
        }
    });
    service.start();
}

function initializeServices(){    
    startService();    
    console.log("Services have been started...");
}

exports.initializeServices = initializeServices
exports.addPayment = addPayment