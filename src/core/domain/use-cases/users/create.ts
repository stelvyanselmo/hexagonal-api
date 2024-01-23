import Users, { UserProps } from "../../entities/users";
import { ICreateUserUseCase } from "../../ports/inbound/userInboundPorts";
import UserAdaptersPort from "../../ports/outbound/userOutboundPort";

export type CreateUserResponse = {
    message: string;
}

//@application bussiness
export default class CreateUserUseCase implements ICreateUserUseCase {

    constructor(
        private readonly userAdaptersPort: UserAdaptersPort,
    ) {}

    async execute({name, email, pwd }: UserProps): Promise<CreateUserResponse | null> {

        const user = await this.userAdaptersPort.find(email);

        if (user !== null) {

            throw new Error("This email adress already exists, try another email adress!");

        }

        const userObject = Users.create({name, email, pwd});

        await this.userAdaptersPort.save(userObject);

        return {
            message: "user created successfully"
        };

    }

}