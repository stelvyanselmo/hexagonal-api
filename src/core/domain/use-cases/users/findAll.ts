import Users from "../../entities/users";
import { IFindAllUsersUseCase } from "../../ports/inbound/userInboundPorts";
import UserAdaptersPort from "../../ports/outbound/userOutboundPort";


//@application bussiness
export default class FindAllUsersUseCase implements IFindAllUsersUseCase  {

    constructor(
        private readonly userAdaptersPort: UserAdaptersPort,
    ) {}

    async execute(): Promise<Users[]> {

        const users = await this.userAdaptersPort.findAll();

        return users;

    }

}