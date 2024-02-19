import { IsEmail, IsNotEmpty,IsOptional,MinLength } from "class-validator"
import { EmailIsUnique } from "../validation/email-is-unique.validator"

export class UpdateUserDto {

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsOptional()
    name: string

    @IsEmail(undefined, { message: 'O email não é válido' })
    @EmailIsUnique({ message: "Já existe um usuário com este e-mail" })
    @IsOptional()
    email: string

    @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    @IsOptional()
    password: string

}