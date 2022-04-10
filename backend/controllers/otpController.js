import twilio from "twilio"
import User from '../Models/userModel.js'
import generateToken from "../utils/generateToken.js"

const CLIENT = new twilio(process.env.ACCOUND_SID, process.env.AUTH_TOKEN)

const generateAndSendOtp =async (req,res) => {

    const user = await User.findOne({number:req.body.number})
    if(!user){
        res.status(401).json({
            success:false,
            message:"user not found !"
        })
        
    }else{

        try {
            CLIENT.verify
              .services(process.env.SERVICE_ID)
              .verifications.create({
                to: `+91${req.body.number}`,
                channel: "sms",
              })
              .then((response) => {
                res.status(200).json({
                  success: true,
                  user,
                  message: "Message Send Sucessfully !",
                });
              });
          } catch (error) {
            //   console.log(error);
            // res.status(500).json({
            //     success:false,
            //     message:error
            // })
          }
        };

    }
  
 
const validateOtp = async(req,res)=>{

    const user = await User.findOne({number:req.body.number})
    try {
        CLIENT.verify
          .services(process.env.SERVICE_ID)
          .verificationChecks.create({
            to: `+91${req.body.number}`,
            code: req.body.code,
          })
          .then((response) => {
               console.log(response);
               if(response.valid){
                res.json({
                    success: true,
                    message: "Varified successfully !",
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                  });

               }else{
                res.status(200).json({
                    success: false,
                    message: "incorrect otp !",
                  });
               }
            
          });
      } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
      }

}
export{generateAndSendOtp,validateOtp}