import Users from "../../../core/domain/entities/users";
import UserAdaptersPort from "../../../core/domain/ports/outbound/userAdaptersPort";

//@database in memory using repositories pattern
export default class InMemoryUsersRepository implements UserAdaptersPort {

    public static users: Users[] = [];



    async findAll(): Promise<Users[]> {
        
       return InMemoryUsersRepository.users;

    }

    async save(user: Users): Promise<void> {

        

        console.log("data saved", user ,InMemoryUsersRepository.users)
        
        InMemoryUsersRepository.users.push(user);



    }

    async find(email: string): Promise<Users | null> {

       const user = InMemoryUsersRepository.users.find(user => user.props.email == email);

       if (!user) {

            return null;

       }

       return user;

    }

}