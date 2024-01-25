import Users, { UserPropsDto } from "../../../core/domain/entities/users";
import UserOutboundPorts from "../../../core/domain/ports/outbound/userOutboundPort";import { inMemoryUsersRepository } from "../../inbound/server/routes/dependencies";
 "../../../core/domain/ports/outbound/userOutboundPort";

//@database in memory using repositories pattern
export default class InMemoryUsersRepository implements UserOutboundPorts {

    private static users: Users[] = [];

    public async create(user: Users): Promise<void> {

         InMemoryUsersRepository.users.push(user);

    }

    public async findAll(): Promise<Users[]> {
        
        return InMemoryUsersRepository.users;
 
    }

    public async update(_email: string, updatedUser: Users): Promise<Users | null> {

        const index = InMemoryUsersRepository.users.findIndex(({props:{email}})=> email == _email);

        if (index != -1) {

            InMemoryUsersRepository.users[index] = updatedUser;

            return updatedUser;

        } 

        return null; // user not found
        
    }

    public async findOne(email: string): Promise<Users | null> {

       const user = InMemoryUsersRepository.users.find(user => user.props.email == email);

       if (!user) return null;

       return user;

    }

    public async delete(email: string): Promise<void> {

        InMemoryUsersRepository.users = InMemoryUsersRepository.users.filter((user)=> user.props.email !== email);

    }

    //@in memory database
    //Jan 25/ 17:11 P.M
    
}