import type {Request,Response,NextFunction} from 'express'
import { type ZodSchema,ZodError } from 'zod'

export const validateBody =(schema:ZodSchema)=>{
  return (req:Request,res:Response,next:NextFunction)=>{
try{
  const validatedDate = schema.parse(req.body)
  req.body = validatedDate
  // if we have deaflut values we won't get the value at first that is why we need to reasign it again
  next()
}
catch(error){
  if (error instanceof ZodError)
  {
    return res.status(400).json({
      error:'Validation Failed',
      details:error.issues.map((err)=>({
        field:err.path.join('.'),
        message:err.message
      })),
    })
  }
  next(error)
}
  }

}

export const validateParams=(schema:ZodSchema)=>{
return (req:Request,res:Response,next:NextFunction)=>{
  try{
 schema.parse(req.params)
 next()
  }catch(e){
if(e instanceof ZodError){
  return res.status(400).json({
    error:'Invalid params',
    details:e.issues.map((err)=>({
      field:err.path.join('.'),
      message:err.message,
    })),
  })
}
next(e)
  }
}
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid Query",
          details: e.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};