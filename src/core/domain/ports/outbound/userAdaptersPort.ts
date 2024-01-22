import Users from "../../entities/users";

export default interface UserAdaptersPort {

    save(user: Users): Promise<void>;
    findAll(): Promise<Users[]>;
    find(email: string): Promise<Users | null>;

}