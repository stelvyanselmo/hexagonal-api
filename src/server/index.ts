import fastify from "fastify";
import CreateUserUseCAse from "../core/domain/use-cases/create-user-use-case";
import InMemoryUsersRepository from "../adapters/outbound/repositories/in-memory-users-repositories";
import z from "zod";

const server = fastify({ logger: true });

server.post("/payload", async (req, replay)=>{

    const createUserSchema = z.object({

        name: z.string(),
        email: z.string(),
        pwd: z.string(),

    });

    const payload = createUserSchema.parse(req.body);

    const adapter = new InMemoryUsersRepository();
    const execute = new CreateUserUseCAse(adapter);

    const response = await execute.execute(payload);

    replay.code(202).send(response);

});



//@run the htpp server

    try {

         server.listen({port:3333});
         
     } catch (error) {
     
         server.log.error(error);
         process.exit(1);
         
     }

