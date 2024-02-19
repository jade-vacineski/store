import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailIsUniqueConstraint } from "./validation/email-is-unique.validator";

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        EmailIsUniqueConstraint 
    ]
})
export class UserModule { }
