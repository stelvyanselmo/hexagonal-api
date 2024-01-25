import Users from "../../entities/users";
import { IFindAllUsersUseCase } from "../../ports/inbound/userInboundPorts";
import UserOutboundPorts from "../../ports/outbound/userOutboundPort";

//@application business
export default class FindAllUsersUseCase implements IFindAllUsersUseCase  {

    constructor(
        private readonly userAdaptersPort: UserOutboundPorts,
    ) {}

    //@application orchestrator
    async execute(): Promise<Users[]> {

        const users = await this.userAdaptersPort.findAll();

        return users;

    }

}