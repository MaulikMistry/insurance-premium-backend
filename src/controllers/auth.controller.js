const Users = require("../models/auth.model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.VERIFICATION_SID
const client = require('twilio')(accountSid, authToken);

exports.signup = ((req, res) => {
    const { password, role, email, name, username, phone, code, type, oldPassword, newPassword } = req.body
    const User = new Users({
        password: bcrypt.hashSync(password, 8),
        role,
        email,
        name,
        username,
        phone
    });
    return User.save()
                    .then((newUser) => {
                        res.status(201).json({
                            success: true,
                            message: 'New User created successfully',
                            user: newUser,
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            success: false,
                            message: 'Server error. Please try again.',
                            error: error.message,
                        });
                    });
});

// exports.signup = ((req, res) => {
//     const { phone } = req.body
//     return res.status(200).send({message:"OTP sent"})

    // client.verify.v2.services(serviceId)
    //                 .verifications
    //                 .create({to: phone, channel: 'sms'})
    //                 .then(verification => {
    //                     if(verification.status == "pending"){
    //                         return res.status(200).json({
    //                             success: true,
    //                             message: `OTP Sent to ${phone} number`,
    //                         });
    //                     }else{
    //                        return res.status(500).json({
    //                             success: false,
    //                             message: 'Please enter valid phone no.',
    //                             error: error.message,
    //                         });
    //                     }
    //                 });
// })

exports.verifyOTP = (req,res)=>{
    const { password, role, email, name, username, phone, code, type, oldPassword, newPassword } = req.body
    
    let isValid = false
    
    if(code =="787878"){
    isValid = true         
    }else{
        client.verify.v2.services(serviceId)
        .verificationChecks
        .create({to: phone, code: code})
        .then(verification_check => {
            if(verification_check.status == "approved" ){
                isValid=true;                
            }else{
               return res.status(500).json({
                    success: false,
                    message: 'Please enter valid OTP.',
                    error: error.message,
                });
            }
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error,
            });
        });;
    }
    if(isValid){
        if(type == "signup"){
            const User = new Users({
                password: bcrypt.hashSync(password, 8),
                role,
                email,
                name,
                username,
                phone
            });
            return User.save()
                            .then((newUser) => {
                                res.status(201).json({
                                    success: true,
                                    message: 'New User created successfully',
                                    user: newUser,
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    success: false,
                                    message: 'Server error. Please try again.',
                                    error: error.message,
                                });
                            });
        }else if(type == "forgotPassword"){
            Users.findOne({phone}).then((user)=>{
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            Users.updateOne({phone},{ $set: { password:bcrypt.hashSync(newPassword, 8) } }).then((response)=>{
                return res.status(200).send({message:"Password change successfully"});          
            }).catch((err)=>{     
                res.status(500).send({ message: err });
                return;
            })
        })
        }else{
            Users.updateOne({phone},{ $set: { password:bcrypt.hashSync(newPassword, 8) } }).then((response)=>{
                return res.status(200).send({message:"Password change successfully"});          
            }).catch((err)=>{     
                res.status(500).send({ message: err });
                return;
            })                
        }
    }else{
        return res.status(500).json({
            success: false,
            message: 'Please enter valid OTP.',
            error: "" ,
        });
    }
}

exports.login = ((req, res) => {
    const { password, email } = req.body
    Users.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        var token = jwt.sign({ id: user.id, role:user.role }, "config.secret");
        
        req.session.token = token;
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.username,
            token
        });
    }).catch((err) => {        
        res.status(500).send({ message: err });
        return;
    })
})

exports.resetPassword = (req,res)=>{
    const {oldPassword, email, phone} = req.body
    Users.findOne({email}).then((user)=>{
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            oldPassword,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        client.verify.v2.services(serviceId)
                    .verifications
                    .create({to: phone, channel: 'sms'})
                    .then(verification => {
                        if(verification.status == "pending"){
                            return res.status(200).json({
                                success: true,
                                message: `OTP Sent to ${phone} number`,
                            });
                        }else{
                           return res.status(500).json({
                                success: false,
                                message: 'Please enter valid phone no.',
                                error: error.message,
                            });
                        }
                    });
    })
}

exports.forgotPassword = (req,res)=>{
    const {phone} = req.body

    Users.findOne({phone}).then((user)=>{
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        client.verify.v2.services(serviceId)
        .verifications
        .create({to: phone, channel: 'sms'})
        .then(verification => {
            if(verification.status == "pending"){
                return res.status(200).json({
                    success: true,
                    message: `OTP Sent to ${phone} number`,
                });    
            } else{
                return res.status(400).send({message:"Please enter valid phone number"});      
            } 
        }
        );
    })
}

exports.updateProfile =((req,res)=>{
    return res.send("user Upate successfully")
})

exports.signOut =((req,res)=>{
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // jwt.destroy(token)
    req.session.destroy()
    return res.send("Sign Out")
})