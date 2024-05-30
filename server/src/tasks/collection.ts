import { Request, Response } from "express";
import { CreateTaskDto, UpdateDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";

export class TaskCollection{
    async CreateTask(req:Request,res:Response){
        try {
            const dto = new CreateTaskDto(req.body);

            const errors = await validate(dto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error:errors.map((e)=>e.constraints)
                })
            }

            const task = await prisma.tasks.create({
                data:{
                    title:dto.title,
                    description:dto.description,
                    userId:dto.userId
                }
            })

            return res.status(StatusCodes.CREATED).json(task);
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error.message || error,
                message:"something went wrong"
            })
        }
    }

    async Delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            await prisma.tasks.delete({
                where:{
                    id:id
                }
            })

            return res.status(StatusCodes.ACCEPTED).json({
                message:"task deleted successfully"
            })
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error.message || error,
                message:"something went wrong"
            })
        }
    }

    async GetAll(_req:Request,res:Response){
        try {
            const tasks = await prisma.tasks.findMany();

            return res.status(StatusCodes.ACCEPTED).json(tasks)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error.message || error,
                message:"something went wrong"
            })
        }
    }

    async GetById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            
            const task = await prisma.tasks.findMany({
                where:{
                    userId:id
                }
            })

            return res.status(StatusCodes.ACCEPTED).json(task)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error.message || error,
                message:"something went wrong"
            })
        }
    }

    async Update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);

            const dto = new UpdateDto(req.body);

            console.log(dto)

            const errors = await validate(dto);

            console.log(errors)

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const task = await prisma.tasks.update({
                where:{
                    id:id
                },
                data:{
                    title:dto.title,
                    description:dto.description,
                    duedate:dto.duedate,
                    completed:dto.completed
                }
            })

            return res.status(StatusCodes.ACCEPTED).json(task)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error.message || error,
                message:"something went wrong"
            })
        }
    }
}