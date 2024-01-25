import Users, { UserPropsDto } from "../../entities/users";
import { CreateUserResponse } from "../../use-cases/users/create";

export interface ICreateUserUseCase {

    execute(props: UserPropsDto): Promise<CreateUserResponse | null>;

}

export interface IFindAllUsersUseCase {

    execute(): Promise<Users[]>;

}

export interface IUpdateUserUseCase {

    execute(email: string, props: Users): Promise<Users | null>;

}

export interface IFindOne {

    execute(email: string): Promise<Users | null>;

}

export interface IDelete {

    execute(email: string): Promise<void>;

}