import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repository/user.repository";
import { EmailIsUniqueConstraint } from "./validation/email-is-unique.validator";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        EmailIsUniqueConstraint 
    ]
})
export class UserModule { }
