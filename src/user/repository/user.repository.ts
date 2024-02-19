import { Injectable } from "@nestjs/common";
import { UserEntity } from "../domain/user.entity";
import { error } from "console";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);
    }

    async list() {
        return this.users;
    }

    ExistsWithEmail(email: string) {
        const possibleUser = this.users.find(
            user => user.email === email
        );
        return possibleUser !== undefined;
    }

    async update(id: string, updateData: Partial<UserEntity>) {

        const user = this.searchById(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;

    }

    private searchById(id: string) {
        const possibleUser = this.users.find(
            saveUser => saveUser.id === id
        );

        if (!possibleUser) {
            throw new Error('usuario não não existe')
        }
        return possibleUser;
    }

    async remove(id: string) {
        const user = this.searchById(id);
        this.users = this.users.filter(
            savedUser => savedUser.id !== id
        );
        return user;
    }

}
