import app from'./server.ts'
import { env } from '../env.ts'
app.listen(env.PORT,()=>{
  console.log('listing to port 3000')
})