import Users, { UserProps } from "../../entities/users";
import { CreateUserResponse } from "../../use-cases/users/create";

export interface ICreateUserUseCase {

    execute(props: UserProps): Promise<CreateUserResponse | null>;

}

export interface IFindAllUsersUseCase {

    execute(): Promise<Users[]>;

}

