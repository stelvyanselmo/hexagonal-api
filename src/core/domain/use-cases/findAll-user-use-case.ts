import Users from "../entities/users";
import UserAdaptersPort from "../ports/outbound/userAdaptersPort";


//@application bussiness
export default class FindAllUserUseCAse {

    constructor(
        private readonly userAdaptersPort: UserAdaptersPort,
    ) {}

    async execute(): Promise<Users[]> {

        const users = await this.userAdaptersPort.findAll();

        return users;

    }

}