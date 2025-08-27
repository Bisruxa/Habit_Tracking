import prisma from "../db/prisma.ts";
import  type{Response} from 'express'
import type { AuthenticatedRequest } from "../middleware/auth.ts";

export const createHabit = async(req:AuthenticatedRequest,res:Response)=>{
try {
  const { name, description, frequency, targetCount, isActive } = req.body;
const habit = await prisma.habit.create({
  data:{
    name,
    description,
    frequency,
    targetCount,
    isActive,
    userId:req.user!.id
  }
})
res.status(201).json({
  messae:'Habit created',
  habit,
})
}
catch(e){
console.error('error',e)
res.status(500).json({error:'error in creatin habit'})
}
}
export const getUserHabits = async(req:AuthenticatedRequest,res:Response)=>{
  try{
  const habits = await prisma.habit.findMany({
    where:{
      userId:req.user!.id
    },
    orderBy:{createdAt:'desc'}
  })
  return res.json({
    message: "Habits fetched successfully",
    habits,
  });}
  catch(e){
    console.error('error',e)
    return res.status(500).json({
      error:'error getting the habits'
    })
  }
}
export const updateHabit = async(req:AuthenticatedRequest,res:Response)=>{
  try{
const id = req.params.id!;
const { name, description, frequency, targetCount, isActive } = req.body;
const existingHabit = await prisma.habit.findUnique({
  where: { 
    id,
     },
});
if (!existingHabit || existingHabit.userId !== req.user?.id) {
  return res.status(404).json({ message: "Habit not found" });
}
const updatedHabit = await prisma.habit.update({
  where: { id },
  data: {
    name,
    description,
    frequency,
    targetCount,
    isActive,
  },
});
 return res.json({
   message: "Habit updated successfully",
   habit: updatedHabit,
 });
  }
  catch(e){
console.error("Error updating habit:", e);
return res.status(500).json({ message: "Failed to update habit" });
  }
}