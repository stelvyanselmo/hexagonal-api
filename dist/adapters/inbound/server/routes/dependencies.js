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

// src/adapters/inbound/server/routes/dependencies.ts
var dependencies_exports = {};
__export(dependencies_exports, {
  _delete: () => _delete,
  create: () => create,
  findAll: () => findAll,
  findOne: () => findOne,
  inMemoryUsersRepository: () => inMemoryUsersRepository,
  update: () => update
});
module.exports = __toCommonJS(dependencies_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _delete,
  create,
  findAll,
  findOne,
  inMemoryUsersRepository,
  update
});
