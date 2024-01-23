"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/adapters/inbound/server/routes/routes.users.ts
var routes_users_exports = {};
__export(routes_users_exports, {
  default: () => routes
});
module.exports = __toCommonJS(routes_users_exports);

// src/core/domain/entities/common/entity.ts
var import_crypto = require("crypto");
var Entity = class {
  _id;
  props;
  constructor(props, id) {
    this._id = id ?? (0, import_crypto.randomUUID)();
    this.props = props;
  }
  get id() {
    return this._id;
  }
};

// src/core/domain/entities/users.ts
var Users = class _Users extends Entity {
  constructor(props, id) {
    super(props, id);
  }
  static create(props, id) {
    if (props.name == "") {
      throw new Error("Please provide a valid name!");
    }
    if (props.email == "" || props.pwd == "") {
      throw new Error("Please provide a valid email and password");
    }
    const user = new _Users({
      ...props,
      created_at: props.created_at ?? (/* @__PURE__ */ new Date()).toLocaleString()
    }, id);
    return user;
  }
};

// src/core/domain/use-cases/users/create.ts
var CreateUserUseCase = class {
  constructor(userAdaptersPort) {
    this.userAdaptersPort = userAdaptersPort;
  }
  async execute({ name, email, pwd }) {
    const user = await this.userAdaptersPort.find(email);
    if (user !== null) {
      throw new Error("This email adress already exists, try another email adress!");
    }
    const userObject = Users.create({ name, email, pwd });
    await this.userAdaptersPort.save(userObject);
    return {
      message: "user created successfully"
    };
  }
};

// src/core/domain/use-cases/users/findAll.ts
var FindAllUsersUseCase = class {
  constructor(userAdaptersPort) {
    this.userAdaptersPort = userAdaptersPort;
  }
  async execute() {
    const users = await this.userAdaptersPort.findAll();
    return users;
  }
};

// src/adapters/outbound/repositories/in-memory-users-repositories.ts
var InMemoryUsersRepository = class _InMemoryUsersRepository {
  static users = [];
  async save(user) {
    _InMemoryUsersRepository.users.push(user);
  }
  async findAll() {
    console.log("all users", _InMemoryUsersRepository.users);
    return _InMemoryUsersRepository.users;
  }
  update(email) {
    throw new Error("Method not implemented.");
  }
  async find(email) {
    const user = _InMemoryUsersRepository.users.find((user2) => user2.props.email == email);
    if (!user) {
      return null;
    }
    return user;
  }
  delete(email) {
    throw new Error("Method not implemented.");
  }
};

// src/adapters/inbound/server/routes/dependencies.ts
var inMemoryUsersRepository = new InMemoryUsersRepository();
var findAll = new FindAllUsersUseCase(inMemoryUsersRepository);
var create = new CreateUserUseCase(inMemoryUsersRepository);

// src/adapters/inbound/server/routes/routes.users.ts
var import_zod = require("zod");
var Routes = class {
  _routes;
  _findAll;
  _create;
  constructor(fastifyInstance, findAll2, create2) {
    this._routes = fastifyInstance;
    this._findAll = findAll2;
    this._create = create2;
  }
  async create(props) {
    const response = await this._create.execute(props);
    return response;
  }
  async findAll() {
    return await this._findAll.execute();
  }
  //@routes group
  async routesGroup() {
    this._routes.get("/", async (req, replay) => {
      const users = await this.findAll();
      return await replay.send({ users });
    });
    this._routes.post("/", async (request, replay) => {
      const userSchema = import_zod.z.object({
        name: import_zod.z.string(),
        email: import_zod.z.string(),
        pwd: import_zod.z.string()
      });
      const payload = userSchema.parse(request.body);
      const response = await this.create(payload);
      return replay.send(response);
    });
  }
};
async function routes(fastify) {
  return new Routes(fastify, findAll, create).routesGroup();
}
