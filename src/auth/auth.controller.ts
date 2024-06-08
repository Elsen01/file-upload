import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CrateUserDto} from "../users/dto/request-object";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }       
    @Post('/register')
    async register(@Body()createUserDto: CrateUserDto) {
        const userRegister = await this.authService.register(createUserDto)
        return userRegister
    }
}