
import { FastifyInstance } from "fastify";
import { create, findAll } from "./dependencies";
import Users, { UserProps } from "../../../../core/domain/entities/users";
import { ICreateUserUseCase, IFindAllUsersUseCase } from "../../../../core/domain/ports/inbound/userInboundPorts";
import { z } from "zod";

class Routes {

    private readonly _routes: FastifyInstance;
    private readonly _findAll: IFindAllUsersUseCase;
    private readonly _create: ICreateUserUseCase;

    constructor(fastifyInstance: FastifyInstance,findAll: IFindAllUsersUseCase, create: ICreateUserUseCase) {

        this._routes = fastifyInstance;
        this._findAll = findAll;
        this._create = create;

    }

    private async create(props: UserProps): Promise<any> {

        const response = await this._create.execute(props);

        return response;

    }

    private async findAll(): Promise<Users[]> {

        return await this._findAll.execute();

    }

    //@routes group
    public async routesGroup() {

        this._routes.get("/", async (req, replay) => {

        const users = await this.findAll();

            return await replay.send({users});
            
        });


        this._routes.post<{Body: UserProps}>("/", async (request, replay) => {

            const userSchema = z.object({
                name: z.string(),
                email: z.string(),
                pwd: z.string()
            });

            const payload = userSchema.parse(request.body);

            const response = await this.create(payload);

            return replay.send(response);

        });

    }

}


export default async function routes(fastify: FastifyInstance)  {

    return new Routes(fastify,findAll,create).routesGroup();

}


