import {Controller, Delete, Get, Param, ParseIntPipe} from "@nestjs/common";
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";

@Controller('users')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    
    @Get() 
        async getAllUser() {
        return this.userService.getAllUser()
    }
    @Get('/:id')
    async findById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.userService.findById(id);
    }
    
    @Delete('/id')
    async deleteUser(@Param('id', new ParseIntPipe())id: number): Promise<void> {
        return await this.userService.delete(id)
    }

}