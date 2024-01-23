import fastify from "fastify";
import routes  from "./routes/routes.users";

const server = fastify({ logger: true });

server.register(routes, { prefix:"user"});

//@run the htpp server
try {

    server.listen({ host:'0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3333 });
         
    console.log("HTTPs SERVER RUNNING...");

} catch (error) {
     
    server.log.error(error);
    process.exit(1);
         
}

