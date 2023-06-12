const sgMail=  require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_APIKEY)

const sendSuccesfulOrderMail=async(email,name,orderDetails={})=>{
    try{
        await sgMail.send({
            to:email,
            from:'ratanupadhyay6835@gmail.com',
            subject:' Order Succesfully placed.',
            text:`Hello ${name} your order is succesfully placed `
    
        })
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports={
    sendSuccesfulOrderMail
}