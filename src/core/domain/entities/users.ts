import Entity from "./common/entity";

export type UserProps = {

    name: string;
    email: string;
    pwd: string;
    created_at?: string;

}

//@core bussiness
export default class Users extends Entity<UserProps> {

     private constructor(props: UserProps, id?: string) {

        super(props, id);

    }

    public static create(props: UserProps, id?: string) {

        if (props.name == "") {

            throw new Error("Please provide a valid name!");

        }

        if (props.email == "" || props.pwd =="") {
            
            throw new Error("Please provide a valid email and password");

        }
        
        const user = new Users({
            ...props,
            created_at: props.created_at ?? new Date().toLocaleString(),
        },id);

        return user;

    }
    
}