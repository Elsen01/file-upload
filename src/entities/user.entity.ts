import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {FileEntity} from "./file.entity";
import {IsEmail} from "class-validator";
import {UserGender} from "../users/enums/user-enum";

@Entity('users')
export class UserEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'varchar', length: 15})
    username: string;

    @Column({type: 'varchar', length: 40,unique: true})
    @IsEmail()
    email: string

    @Column({type: 'int'})
    age: number;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'enum', enum: ['m', 'w']})
    gender: UserGender;
    
    @OneToMany(()=> FileEntity,(file)=>file.user)
    files: FileEntity[]
}