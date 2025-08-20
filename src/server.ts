import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {env,isDev,isTestEnv} from '../env.ts'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev',{
  skip:()=>isTestEnv(),
}))
app.get('/health',(req,res)=>{
  res.status(200).json({
    status:'OK',
    timestamp:new Date().toISOString(),
    service:'Habit Tracker API'
  })
})
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/habits',habitRoutes)

export {app}

export default app