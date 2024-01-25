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

// src/core/domain/use-cases/users/delete.ts
var delete_exports = {};
__export(delete_exports, {
  default: () => DeleteUserUseCase
});
module.exports = __toCommonJS(delete_exports);
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
