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

// src/core/domain/use-cases/users/update.ts
var update_exports = {};
__export(update_exports, {
  default: () => UpdateUseCase
});
module.exports = __toCommonJS(update_exports);
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
