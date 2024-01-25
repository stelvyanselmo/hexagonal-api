import { FastifyInstance } from "fastify";
import { _delete, create, findAll, findOne, update } from "./dependencies";
import Users, { UserPropsDto } from "../../../../core/domain/entities/users";
import { ICreateUserUseCase, IDelete, IFindAllUsersUseCase, IFindOne, IUpdateUserUseCase } from "../../../../core/domain/ports/inbound/userInboundPorts";


class Routes {

    private readonly _routes: FastifyInstance;
    private readonly _findAll: IFindAllUsersUseCase;
    private readonly _findOne: IFindOne;
    private readonly _create: ICreateUserUseCase;
    private readonly _update: IUpdateUserUseCase;
    private readonly _deletee: IDelete;

    constructor(fastifyInstance: FastifyInstance,findAll: IFindAllUsersUseCase, create: ICreateUserUseCase,findOne: IFindOne,_delete: IDelete, update: IUpdateUserUseCase) {

        this._routes = fastifyInstance;
        this._findAll = findAll;
        this._create = create;
        this._update = update;
        this._findOne = findOne;
        this._deletee = _delete;

    }

    private async create(props: UserPropsDto): Promise<any> {

        return await this._create.execute(props);

    }

    private async findOne(email: string): Promise<Users | null> {

        return await this._findOne.execute(email);

    }

    private async findAll(): Promise<Users[]> {

        return await this._findAll.execute();

    }

    private async update(email: string, props: Users): Promise<Users | null> {

        return await this._update.execute(email, props);

    }

    private async delete(email: string) {

       await this._deletee.execute(email);

    }


    //@routes group
    public async contextRoutes() {


        this._routes.get("/", async (request, replay) => {

            const users = await this.findAll();

            return await replay.send({users});
            
        });



        this._routes.post<{Body: UserPropsDto }>("/", async (request, replay) => {

            const payload = request.body;

            const response = await this.create(payload);

            return replay.send(response);

        });


       /*this._routes.get<{Body: UserPropsDto, Params:{ email: string}}>("/op", async (request, replay)=> {

            const { email:old_email } = request.params; 
            const props = request.body;

            const reponse = await this.update(old_email, props);

        });*/


        this._routes.get<{Querystring:{ email: string }}>("/search", async (request, replay) => {

            const { email } = request.query;

            const response = await this.findOne(email);

            return replay.send(response);
            
        });



        this._routes.delete<{Body:{ email: string }}>("/", async (request, replay) => {

            const { email } = request.body;

            const response = await this.delete(email);

            return await replay.send(response);

        });


    }

}


export default async function routes(fastify: FastifyInstance)  {

    return new Routes(fastify,findAll,create,findOne,_delete,update).contextRoutes();

}


