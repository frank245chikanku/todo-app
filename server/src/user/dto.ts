import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    constructor(d:RegisterDto){
        this.username=d.username;
        this.email=d.email;
        this.password=d.password;
    }

}

export class LoginDto{
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    constructor(d:LoginDto){
        this.email=d.email;
        this.password=d.password;
    }
}