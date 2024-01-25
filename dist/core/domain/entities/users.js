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

// src/core/domain/entities/users.ts
var users_exports = {};
__export(users_exports, {
  default: () => Users
});
module.exports = __toCommonJS(users_exports);

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
