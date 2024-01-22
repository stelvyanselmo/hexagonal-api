import Users, { UserProps } from "../../entities/users";
import { CreateUserResponse } from "../../use-cases/create-user-use-case";

export default interface CreateUserUseCasePort {

    execute(props: UserProps,id?: string): Promise<CreateUserResponse | null>;

}