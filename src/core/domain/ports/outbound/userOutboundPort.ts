import Users from "../../entities/users";

export default interface UserOutboundPorts {

    save(user: Users): Promise<void>;
    findAll(): Promise<Users[]>;
    find(email: string): Promise<Users | null>;
    update(email: string): Promise<Users | null>;
    delete(email: string): Promise<void>;

}