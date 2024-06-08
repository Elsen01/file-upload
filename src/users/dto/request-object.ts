import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import {UserGender} from "../enums/user-enum";

export class CrateUserDto {
    @ApiProperty()
    @IsOptional()
    name: string
    
    @ApiProperty()
    @IsOptional()
    username: string
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string
    
    @ApiProperty()
    @IsNotEmpty()
    password: string
    
    @ApiProperty()
    age: number
    
    @ApiProperty({default:'Man'})
    @IsEnum(UserGender)
    gender: UserGender
}