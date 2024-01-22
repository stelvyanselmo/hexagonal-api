import InMemoryUsersRepository from "../../../adapters/outbound/repositories/in-memory-users-repositories";
import { describe,it,expect } from "vitest"
import FindAllUserUseCAse from "./findAll-user-use-case";

describe("List the users",()=> {

    it("should be able to list all users", async ()=>{

        const userAdaptersPorts = new InMemoryUsersRepository();

        const user = new FindAllUserUseCAse(userAdaptersPorts);

        console.log( await userAdaptersPorts.findAll());

        expect(user).toBeTruthy();
         
    });  

});