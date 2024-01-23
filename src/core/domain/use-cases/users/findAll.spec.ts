import InMemoryUsersRepository from "../../../../adapters/outbound/repositories/in-memory-users-repositories";
import { describe,it,expect } from "vitest"
import FindAllUsersUseCase from "./findAll";

describe("List the users",()=> {

    it("should be able to list all users", async ()=>{

        const userAdaptersPorts = new InMemoryUsersRepository();

        const user = new FindAllUsersUseCase(userAdaptersPorts);

        console.log( await userAdaptersPorts.findAll());

        expect(user).toBeTruthy();
         
    });  

});