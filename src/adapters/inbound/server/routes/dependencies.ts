import DeleteUserUseCase from "../../../../core/domain/use-cases/users/delete";
import CreateUserUseCase from "../../../../core/domain/use-cases/users/create";
import FindAllUsersUseCase from "../../../../core/domain/use-cases/users/findAll";
import FindOneUseCase from "../../../../core/domain/use-cases/users/findOne";
import UpdateUseCase from "../../../../core/domain/use-cases/users/update";
import InMemoryUsersRepository from "../../../outbound/repositories/in-memory-users-repositories";

export const inMemoryUsersRepository = new InMemoryUsersRepository();

export const findAll = new FindAllUsersUseCase(inMemoryUsersRepository);
export const _delete = new DeleteUserUseCase(inMemoryUsersRepository);
export const create = new CreateUserUseCase(inMemoryUsersRepository);
export const findOne = new FindOneUseCase(inMemoryUsersRepository);
export const update = new UpdateUseCase(inMemoryUsersRepository);