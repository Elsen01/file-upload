import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
    }
    
    async getAllUser() {
        return this.userRepository.find()
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new HttpException(
                `This user ${id} does not exist`,
                HttpStatus.NOT_FOUND);
        
        return user;
    }

    async delete(userId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
        }
        if (user.id === userId) {
            await this.userRepository.remove(user);
            return;
        }
    }
    
    async findByEmail(email: string) {
        return this.userRepository.findOne({where:{email}})
    }
    
    async finddById(id: number) {
        const findUser = await this.userRepository.findOne({where:{id}})
        if(!findUser) {
            throw new HttpException(`This user ${id} do exits`,HttpStatus.NOT_FOUND)
        }        
    }

}