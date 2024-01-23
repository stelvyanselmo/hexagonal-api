import InMemoryUsersRepository from "../../../../adapters/outbound/repositories/in-memory-users-repositories";
import CreateUserUseCAse from "./create";
import { describe,it,expect } from "vitest"

describe("Create a user",()=> {

    it("should be able to create a new user", async ()=>{

        const userAdaptersPorts = new InMemoryUsersRepository();
        const user = new CreateUserUseCAse(userAdaptersPorts);

        /*const data = Users.create({name:"Lucy Doe", email:"jhon@example.com", pwd:"1234"})
        userAdaptersPorts.save(data);*/

        const sut = await user.execute({name:"Jhon Doe", email:"jhon@example.com", pwd:"1234"});

        expect(sut?.message).toEqual("user created successfully");
        expect(sut).toBeTruthy();

    });

});