import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {
        
    }
    

    @Post()
    async createUser(@Body() userData:CreateUserDto) {
        this.userRepository.save(userData);
        return userData;
    }

    @Get()
    async listUsers(){
        return this.userRepository.list();
    }
}