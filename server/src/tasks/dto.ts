import { IsBoolean,  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsString()
    duedate:string;

    @IsNotEmpty()
    @IsNumber()
    userId:number;
    constructor(d:CreateTaskDto){
        this.title=d.title;
        this.description=d.description;
        this.duedate=d.duedate;
        this.userId=d.userId;
    }
}

export class UpdateDto{
    @IsOptional()
    @IsString()
    title?:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsString()
    duedate?:string;

    @IsOptional()
    @IsBoolean()
    completed?:boolean;

    constructor(d:UpdateDto){
        this.title=d.title;
        this.description=d.description;
        this.duedate=d.duedate;
        this.completed=d.completed;
    }
}