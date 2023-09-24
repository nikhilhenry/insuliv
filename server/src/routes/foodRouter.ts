import { Router } from "express";
import { prisma } from "../lib/prisma";
import { allowedNodeEnvironmentFlags } from "process";

export const foodRouter = Router();

foodRouter.get("/",async(req,res) =>{
    const foodlog=await prisma.foodActivity.findMany();
    return res.json(foodlog);
});

foodRouter.post('/', async(req,res,next) =>{
    try {
        const food=await prisma.foodActivity.create({
            data:req.body
        });
        res.json(food)
    } catch (error) {
        next(error)
    }
});

foodRouter.delete('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params
        const deletedFood=await prisma.foodActivity.delete(
            {
                where:
                {
                    id: Number(id)
                }
            }
        )
        res.json(deletedFood)
    } catch (error) {
        next(error) 
    }
});
