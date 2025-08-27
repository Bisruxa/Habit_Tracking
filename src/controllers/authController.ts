import type {Request,Response} from 'express'
import prisma from '../db/prisma.ts'
import { generateToken } from '../utils/jwt.ts'
import {  comparePassowrds, hashPassword } from '../utils/passwords.ts'
export const register=async(req:Request,res:Response)=>{
try{
  const { email, password, username ,firstName,lastName} = req.body;
  const hasedPassword = await hashPassword(password)
  const user = await prisma.users.create({
    data:{
      email,
      password:hasedPassword,
      username,
      firstName,
      lastName
    }
  })
  
  const token = await generateToken({
    id:user.id,
    email:user.email,
    username:user.username
  })
  // if i just resturn user instead of constructing my own user object the hased password would also be send toether with the user name and all of informatiion which is a bad thing that is why am creating my own user object so that it send me only the required field that i need
  return res.status(201).json({
    message: "User Created",
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    },
    token,
  });
}catch(e){
  console.error('Registration error',e)
  res.status(500).json({error:'Failed to create user'})
}
}

export const login = async (req:Request,res:Response)=>{
  try{
    const {email,password}= req.body
    const user = await prisma.users.findUnique({
      where:{
        email
        
      }
    })
    if(!user){
      return res.status(401).json({
        messaage:'Invalid Credentials'
      })
    }
    const isValidatedPassword = await comparePassowrds(password,user.password)
    if(!isValidatedPassword){
     return res.status(401).json({messaage:'Invalid Credentials'})
    }
    const token = await generateToken({
      id:user.id,
      email:user.email,
      username:user.username,
    })
    return res.json({
      messae:'Login success',
      user:{
        id:user.id,
        email:user.email,
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        createdAt:user.createdAt
      },
      token
    })
  }
  catch(e){
    console.error('Logint error',e)
    res.status(500).json({message:'Failed to login'})

  }
}