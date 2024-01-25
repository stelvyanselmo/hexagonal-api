import { IDelete } from "../../ports/inbound/userInboundPorts";
import UserOutboundPorts from "../../ports/outbound/userOutboundPort";

export default class DeleteUserUseCase implements IDelete {

    constructor(
        private readonly adapterPort: UserOutboundPorts
    ) {}

   public async execute(email: string): Promise<void> {

        const response = await this.adapterPort.findOne(email);

        if (response == null) {
                
            throw new Error("user not found, check the email and try again");
    
        }
    
        await this.adapterPort.delete(email);
 
    }

}