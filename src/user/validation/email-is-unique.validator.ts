// validation/email-is-unique.validator.ts

import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@ValidatorConstraint({ async: true })
export class EmailIsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) {}

    async validate(email: string): Promise<boolean> {
        const userWithEmailExists = await this.userRepository.ExistsWithEmail(email);
        return !userWithEmailExists;
    }
}

export function EmailIsUnique(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "emailIsUnique",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueConstraint,
        });
    };
}
