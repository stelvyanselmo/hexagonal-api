import Entity from "./common/entity";

export type UserPropsDto = {

    name: string;
    email: string;
    pwd: string;
    created_at?: string;

}

//@core business
export default class Users extends Entity<UserPropsDto> {

     private constructor(props: UserPropsDto, id?: string) {

        super(props, id);

    }

    public static create(props: UserPropsDto, id?: string) {

        //@validation business
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