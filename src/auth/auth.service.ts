import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
// @ts-ignore
import {CrateUserDto} from "./dto/request-object";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>) {
    }
    
    async register(createUserDto: CrateUserDto) {
        const userDB = await this.findByEmail(createUserDto.email)
        if (userDB)
            throw new HttpException(`${createUserDto.email} already exists`,HttpStatus.BAD_REQUEST)

        const user = new UserEntity()
        user.name = createUserDto.name
        user.username = createUserDto.username
        user.email = createUserDto.email
        user.age = createUserDto.age
        user.gender = createUserDto.gender
        user.password = await bcrypt.hash(createUserDto.password,10)

        const newUser = await this.userRepository.save(user)
        const { password, ...userResponse } = newUser;

        return userResponse
    }
    
    
    
    async findByEmail(email: string) {
        return this.userRepository.findOne({where:{email}})
    }

    async findById(id: number) {
        const findUser = await this.userRepository.findOne({where:{id}})
        if(!findUser) {
            throw new HttpException(`This user ${id} do exits`,HttpStatus.NOT_FOUND)
        }
    }
}