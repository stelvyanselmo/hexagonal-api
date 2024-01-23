import Users from "../../../core/domain/entities/users";
import UserAdaptersPort from "../../../core/domain/ports/outbound/userOutboundPort";

//@database in memory using repositories pattern
export default class InMemoryUsersRepository implements UserAdaptersPort {

    private static readonly users: Users[] = [];

    async save(user: Users): Promise<void> {

         InMemoryUsersRepository.users.push(user);

    }

    async findAll(): Promise<Users[]> {
        
        console.log("all users",InMemoryUsersRepository.users);
        
        return InMemoryUsersRepository.users;
 
    }

    public update(email: string): Promise<Users | null> {

        throw new Error("Method not implemented.");

    }

    async find(email: string): Promise<Users | null> {

       const user = InMemoryUsersRepository.users.find(user => user.props.email == email);

       if (!user) {

            return null;

       }

       return user;

    }

    public delete(email: string): Promise<void> {

        throw new Error("Method not implemented.");

    }

}