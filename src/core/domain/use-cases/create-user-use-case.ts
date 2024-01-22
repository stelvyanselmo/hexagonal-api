import Users, { UserProps } from "../entities/users";
import CreateUserUseCasePort from "../ports/inbound/createUserUseCasePort";
import UserAdaptersPort from "../ports/outbound/userAdaptersPort";

export type CreateUserResponse = {
    message: string;
}

//@application bussiness
export default class CreateUserUseCAse implements CreateUserUseCasePort {

    constructor(
        private readonly userAdaptersPort: UserAdaptersPort,
    ) {}

    async execute(props: UserProps): Promise<CreateUserResponse | null> {

        const user = await this.userAdaptersPort.find(props.email);

        if (user !== null) {

            throw new Error("This email adress already exists, try another email adress!");

        }

        const userObject = Users.create(props);

        await this.userAdaptersPort.save(userObject);

        return {
            message: "user created successfully"
        };

    }

}