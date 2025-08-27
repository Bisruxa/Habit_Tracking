import bcrypt from 'bcrypt'
import env from '../../env.js'

export const hashPassword = async(password:string)=>{
  return bcrypt.hash(password,env.BCRYPT_ROUNDS)
}