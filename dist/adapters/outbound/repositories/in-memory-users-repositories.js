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

// src/adapters/outbound/repositories/in-memory-users-repositories.ts
var in_memory_users_repositories_exports = {};
__export(in_memory_users_repositories_exports, {
  default: () => InMemoryUsersRepository
});
module.exports = __toCommonJS(in_memory_users_repositories_exports);
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
