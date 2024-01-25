import Users from "../../entities/users";

export default interface UserOutboundPorts {

    create(user: Users): Promise<void>;
    findAll(): Promise<Users[]>;
    findOne(email: string): Promise<Users | null>;
    update(email: string, updatedUser: Users): Promise<Users | null>;
    delete(email: string): Promise<void>;

}