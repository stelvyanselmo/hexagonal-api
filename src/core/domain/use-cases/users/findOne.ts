import Users from "../../entities/users";
import { IFindOne } from "../../ports/inbound/userInboundPorts";
import UserOutboundPorts from "../../ports/outbound/userOutboundPort";

export default class FindOneUseCase implements IFindOne {

    constructor(
        private readonly adapterPort: UserOutboundPorts
    ){}

    public async execute(email: string): Promise<Users> {
        
        const user = await this.adapterPort.findOne(email);

        if (user == null) {

            throw new Error("user not found");

        }

        return user;

    }

    
}