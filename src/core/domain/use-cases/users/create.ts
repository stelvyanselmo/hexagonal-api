import Users, { UserPropsDto } from "../../entities/users";
import { ICreateUserUseCase } from "../../ports/inbound/userInboundPorts";
import UserOutboundPorts from "../../ports/outbound/userOutboundPort";

export type CreateUserResponse = {

    resourceType: string;
    text: {
        div: string;
        status: string;
    }
    message: string;

}

//@application business
export default class CreateUserUseCase implements ICreateUserUseCase {

    constructor(
        private readonly userAdaptersPort: UserOutboundPorts,
    ) {}

    //@application orchestrator
    async execute({name, email, pwd }: UserPropsDto): Promise<CreateUserResponse | null> {

        const user = await this.userAdaptersPort.findOne(email);

        if (user !== null) {

            throw new Error("This email adress already exists, try another email adress!");

        }

        const userObject = Users.create({name, email, pwd});

        await this.userAdaptersPort.create(userObject);

        return {

            resourceType:"user entity",
            text: {
                div:"resource generated successfully",
                status:"success"
            },
            message:"user created successfully"
            
        }

    }

}