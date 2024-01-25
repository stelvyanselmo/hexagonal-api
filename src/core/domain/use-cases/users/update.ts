import Users, { UserPropsDto } from "../../entities/users";
import { IUpdateUserUseCase } from "../../ports/inbound/userInboundPorts";
import UserOutboundPorts from "../../ports/outbound/userOutboundPort";

//@application business
export default class UpdateUseCase implements IUpdateUserUseCase {

    constructor(
        private readonly userAdapterPort: UserOutboundPorts
    ) {}
    
    //@application orchestrator
    public async execute(email: string, updatedUser: Users): Promise<Users | null> {
        
        const response = await this.userAdapterPort.update(email, updatedUser);

        if (!response) {

            throw new Error("Couldn't update. User not found: " + email);

        }

        return response;
        
    }
    
}