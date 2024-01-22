var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server/index.ts
var import_fastify = __toESM(require("fastify"));

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

// src/core/domain/use-cases/create-user-use-case.ts
var CreateUserUseCAse = class {
  constructor(userAdaptersPort) {
    this.userAdaptersPort = userAdaptersPort;
  }
  async execute(props) {
    const user = await this.userAdaptersPort.find(props.email);
    if (user !== null) {
      throw new Error("This email adress already exists, try another email adress!");
    }
    const userObject = Users.create(props);
    await this.userAdaptersPort.save(userObject);
    return {
      message: "user created successfully"
    };
  }
};

// src/adapters/outbound/repositories/in-memory-users-repositories.ts
var InMemoryUsersRepository = class _InMemoryUsersRepository {
  static users = [];
  async findAll() {
    return _InMemoryUsersRepository.users;
  }
  async save(user) {
    console.log("data saved", user, _InMemoryUsersRepository.users);
    _InMemoryUsersRepository.users.push(user);
  }
  async find(email) {
    const user = _InMemoryUsersRepository.users.find((user2) => user2.props.email == email);
    if (!user) {
      return null;
    }
    return user;
  }
};

// src/server/index.ts
var import_zod = __toESM(require("zod"));
var server = (0, import_fastify.default)({ logger: true });
server.post("/payload", async (req, replay) => {
  const createUserSchema = import_zod.default.object({
    name: import_zod.default.string(),
    email: import_zod.default.string(),
    pwd: import_zod.default.string()
  });
  const payload = createUserSchema.parse(req.body);
  const adapter = new InMemoryUsersRepository();
  const execute = new CreateUserUseCAse(adapter);
  const response = await execute.execute(payload);
  replay.code(202).send(response);
});
try {
  server.listen({ port: 3333 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
