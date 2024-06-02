import {Controller} from "@nestjs/common";
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
}