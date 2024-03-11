import { NextFunction, Request ,Response} from "express";
import asyncWrapper from "../middleware/asynHandler";
import { createCustomError ,HttpCode} from "../errors/customError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const register =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const {email,username,password} = req.body;
    console.log(req.body)
    const emailAlreadyExists = await prisma.user.findFirst({
        where: {
            email: email,
    }});

    if(emailAlreadyExists){ 
        return next(createCustomError(`Email already exists`, HttpCode.BAD_REQUEST));
    };

    const hashPassword= await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({ 
        data:{
            email,
            username,
            password:hashPassword,    
        }
    })

    console.log(newUser)
    const token= await generateToken({username:newUser.username,id:newUser.id});
    
    res.status(201).json({
        sucess: true,
        data:newUser,
        message:'user sucessfully added',
        token:token
    })
}); 

export const login =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const{email,password} = req.body;
    console.log(req.body)

    if(!email || !password){
        return next(createCustomError(`Please provide email and password`, HttpCode.BAD_REQUEST));
    }

    const user = await prisma.user.findFirst({  
        where: {
            email: email,
    }});
    
    if(!user){
        return next(createCustomError(`Invalid Credentials email`, HttpCode.UNAUTHORIZED));
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
    if (!isPasswordCorrect) {
        return next(createCustomError(`Invalid Credentials password`, HttpCode.UNAUTHORIZED));
    }
    

    const tokenUser = await generateToken({username:user.username,id:user.id});

    res.status(200).json({
        sucess: true,
        data:user,
        message:'user sucessfully login',
        token:tokenUser
    })
}); 
