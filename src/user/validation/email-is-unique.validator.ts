import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, isValidationOptions, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async:true})
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) {

    }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        throw new Error("Method not implemented.");
        const userWithEmailExists = await this.userRepository.ExistsWithEmail(value);
        return !userWithEmailExists;
    }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) =>{
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor(),
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueValidator
        })
    }
}

