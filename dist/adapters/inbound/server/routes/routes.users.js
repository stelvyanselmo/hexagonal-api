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

// src/core/domain/use-cases/users/delete.ts
var DeleteUserUseCase = class {
  constructor(adapterPort) {
    this.adapterPort = adapterPort;
  }
  async execute(email) {
    const response = await this.adapterPort.findOne(email);
    if (response == null) {
      throw new Error("user not found, check the email and try again");
    }
    await this.adapterPort.delete(email);
  }
};

// src/core/domain/entities/common/entity.ts
var import_crypto = require("crypto");
var Entity = class {
  id;
  props;
  constructor(props, id) {
    this.id = id ?? (0, import_crypto.randomUUID)();
    this.props = props;
  }
  get _id() {
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
  //@application orchestrator
  async execute({ name, email, pwd }) {
    const user = await this.userAdaptersPort.findOne(email);
    if (user !== null) {
      throw new Error("This email adress already exists, try another email adress!");
    }
    const userObject = Users.create({ name, email, pwd });
    await this.userAdaptersPort.create(userObject);
    return {
      resourceType: "user entity",
      text: {
        div: "resource generated successfully",
        status: "success"
      },
      message: "user created successfully"
    };
  }
};

// src/core/domain/use-cases/users/findAll.ts
var FindAllUsersUseCase = class {
  constructor(userAdaptersPort) {
    this.userAdaptersPort = userAdaptersPort;
  }
  //@application orchestrator
  async execute() {
    const users = await this.userAdaptersPort.findAll();
    return users;
  }
};

// src/core/domain/use-cases/users/findOne.ts
var FindOneUseCase = class {
  constructor(adapterPort) {
    this.adapterPort = adapterPort;
  }
  async execute(email) {
    const user = await this.adapterPort.findOne(email);
    if (user == null) {
      throw new Error("user not found");
    }
    return user;
  }
};

// src/core/domain/use-cases/users/update.ts
var UpdateUseCase = class {
  constructor(userAdapterPort) {
    this.userAdapterPort = userAdapterPort;
  }
  //@application orchestrator
  async execute(email, updatedUser) {
    const response = await this.userAdapterPort.update(email, updatedUser);
    if (!response) {
      throw new Error("Couldn't update. User not found: " + email);
    }
    return response;
  }
};

// src/adapters/outbound/repositories/in-memory-users-repositories.ts
var InMemoryUsersRepository = class _InMemoryUsersRepository {
  static users = [];
  async create(user) {
    _InMemoryUsersRepository.users.push(user);
  }
  async findAll() {
    return _InMemoryUsersRepository.users;
  }
  async update(_email, updatedUser) {
    const index = _InMemoryUsersRepository.users.findIndex(({ props: { email } }) => email == _email);
    if (index != -1) {
      _InMemoryUsersRepository.users[index] = updatedUser;
      return updatedUser;
    }
    return null;
  }
  async findOne(email) {
    const user = _InMemoryUsersRepository.users.find((user2) => user2.props.email == email);
    if (!user)
      return null;
    return user;
  }
  async delete(email) {
    _InMemoryUsersRepository.users = _InMemoryUsersRepository.users.filter((user) => user.props.email !== email);
  }
  //@in memory database
  //Jan 25/ 17:11 P.M
};

// src/adapters/inbound/server/routes/dependencies.ts
var inMemoryUsersRepository = new InMemoryUsersRepository();
var findAll = new FindAllUsersUseCase(inMemoryUsersRepository);
var _delete = new DeleteUserUseCase(inMemoryUsersRepository);
var create = new CreateUserUseCase(inMemoryUsersRepository);
var findOne = new FindOneUseCase(inMemoryUsersRepository);
var update = new UpdateUseCase(inMemoryUsersRepository);

// src/adapters/inbound/server/routes/routes.users.ts
var Routes = class {
  _routes;
  _findAll;
  _findOne;
  _create;
  _update;
  _deletee;
  constructor(fastifyInstance, findAll2, create2, findOne2, _delete2, update2) {
    this._routes = fastifyInstance;
    this._findAll = findAll2;
    this._create = create2;
    this._update = update2;
    this._findOne = findOne2;
    this._deletee = _delete2;
  }
  async create(props) {
    return await this._create.execute(props);
  }
  async findOne(email) {
    return await this._findOne.execute(email);
  }
  async findAll() {
    return await this._findAll.execute();
  }
  async update(email, props) {
    return await this._update.execute(email, props);
  }
  async delete(email) {
    await this._deletee.execute(email);
  }
  //@routes group
  async contextRoutes() {
    this._routes.get("/", async (request, replay) => {
      const users = await this.findAll();
      return await replay.send({ users });
    });
    this._routes.post("/", async (request, replay) => {
      const payload = request.body;
      const response = await this.create(payload);
      return replay.send(response);
    });
    this._routes.get("/search", async (request, replay) => {
      const { email } = request.query;
      const response = await this.findOne(email);
      return replay.send(response);
    });
    this._routes.delete("/", async (request, replay) => {
      const { email } = request.body;
      const response = await this.delete(email);
      return await replay.send(response);
    });
  }
};
async function routes(fastify) {
  return new Routes(fastify, findAll, create, findOne, _delete, update).contextRoutes();
}
