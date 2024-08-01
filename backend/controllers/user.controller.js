import  jwt  from "jsonwebtoken"
import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const register=async (req, res)=>{
    try{
        console.log(req.body)
    const {fullname, email, phonenumber, password, role}=req.body

    if(!fullname || !email || !phonenumber || !password || !role){
        return res.status(400).json({message:'Somehing missing', success:false})
    }
    const user=await User.findOne({email})
    if(user){
        res.status(400).json({message:'User alreday exist with this email', success:false})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullname, 
        email, 
        phonenumber, 
        password:hashedPassword, 
        role
    })

    return res.status(201).json({
        message: "Account created successfully.",
        success: true
    });
} catch(error){
            console.log(error.message)
}
}

export const login=async (req, res)=>{
    try{
    const {email,  password, role}=req.body

    if(email ||  password || role){
        return res.status(400).json({message:'Somehing missing', success:false})
    }
    let user=await User.findOne({email})
    if(!user){
        res.status(400).json({message:'Incorrect email or password', success:false})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect email or password.",
            success: false,
        })
    };

    if(role!==user.role){
        return res.status(400).json({
            messsage:'Account does not exist with current role',
            success:false
        })
    }

    const tokenData={user:user._id}
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


const updateProfile=async (req, res)=>{
    try{

        const {fullname, email, phoneNumber, bio, skills}=req.body

    if(fullname || email || phoneNumber || bio|| skills){
        return res.status(400).json({message:'Somehing missing', success:false})
    }

    const skillArray=skills.split(",")
    const userId=req.id

    const user=await User.findById(userId)

    if (!user) {
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }
    // updating data
    if(fullname) user.fullname = fullname
    if(email) user.email = email
    if(phoneNumber)  user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray

    await user.save()

    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json({
        message:"Profile updated successfully.",
        user,
        success:true
    })


    }
    catch(err){
            console.log(err.message)
    }
}