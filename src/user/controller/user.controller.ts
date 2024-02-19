import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserEntity } from "../domain/user.entity";
import { v4 as uuid } from 'uuid';
import { UserListDto } from "../dto/userList.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";


@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {

    }


    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.password = userData.password;
        userEntity.name = userData.name;
        userEntity.id = uuid();

        this.userRepository.save(userEntity);
        return {
            user: new UserListDto(userEntity.id, userEntity.name),
            message: 'usuario criado com suceso'
        }

    }

    @Get()
    async listUsers() {
        const saveUsers = await this.userRepository.list();
        const userList = saveUsers.map(
            user => new UserListDto(
                user.id,
                user.name
            )
        );

        return userList;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
        const updatedUser = await this.userRepository.update(id, updateData);
        return {
            user: updatedUser,
            message: 'usuario atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const userRemoved = await this.userRepository.remove(id);
        return {
            user: userRemoved,
            message: 'usuario removido com sucesso'
        }
    }
}