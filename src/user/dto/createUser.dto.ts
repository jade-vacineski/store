import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto{

    
    @IsNotEmpty({message:'O nome não pode ser vazio'})
    name: string

    @IsEmail(undefined, {message:'O email não é válido'})
    email: string

    @MinLength(6, {message: "A senha deve ter no mínimo 6 caracteres"})
    password: string
    
}