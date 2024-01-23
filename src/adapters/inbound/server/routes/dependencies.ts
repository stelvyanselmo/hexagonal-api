import CreateUserUseCase from "../../../../core/domain/use-cases/users/create";
import FindAllUsersUseCase from "../../../../core/domain/use-cases/users/findAll";
import InMemoryUsersRepository from "../../../outbound/repositories/in-memory-users-repositories";

export const inMemoryUsersRepository = new InMemoryUsersRepository();
export const findAll = new FindAllUsersUseCase(inMemoryUsersRepository);
export const create = new CreateUserUseCase(inMemoryUsersRepository);
