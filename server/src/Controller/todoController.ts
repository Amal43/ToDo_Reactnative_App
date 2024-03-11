import { NextFunction, Request ,Response} from "express";
import asyncWrapper from "../middleware/asynHandler";
import { createCustomError ,HttpCode} from "../errors/customError";
import { PrismaClient ,Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export type TaskCreateInput = {
    title: string
    completed?: boolean
    user: Prisma.UserCreateNestedOneWithoutTasksInput
}


export const createTodo =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const{title} = req.body;
    const userId = req.body.authUser.id
    console.log(userId)
    
    if(!title){
        return next(createCustomError(`Please provide task title`, HttpCode.BAD_REQUEST));
    }

    let task:TaskCreateInput={
        title,
        completed: false,
        user: {
            connect: {
                id: userId
            },
        },      
    }

    const newTask= await prisma.task.create({ 
        data:task
    });
    console.log(newTask)

    res.status(201).json({
        sucess: true,
        data: newTask,
        message:'task sucessfully added',
    });

}); 

export const getAllTodo =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const userId = req.params.id;
    const userTask: Prisma.TaskFindManyArgs= {
        where:{
            userId: userId,
        }
    }
    const tasks =  await prisma.task.findMany(userTask);

    res.status(200).json({
        sucess: true,
        data:tasks,
        message:'get all tasks sucessfully',
    })
}); 

export const updateTodo =  asyncWrapper(async (req: Request, res: Response , next:NextFunction) =>{
    const taskId = req.params.id;
    const {completed} = req.body;

    console.log(taskId)
    console.log(completed)

    const task = await prisma.task.findFirst({
        where:{
            id:taskId
        }
    });

    if (!task) {
        return next(createCustomError(`task not found`,404));
    }

    const updateTask=  await prisma.task.update({
        data:{
            completed
        },
        where:{
            id: taskId,
        }
    });

    res.status(200).json({
        sucess: true,
        data:updateTask,
        message:'task updated sucessfully',
    });
}); 

