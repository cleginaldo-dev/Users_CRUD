import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { AuthUserController } from "./AuthUserControler";
import { AuthUserUseCase } from "./AuthUserUseCase";

const usersRepository = UsersRepository.getInstance();
const authUserUseCase = new AuthUserUseCase(usersRepository);
const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };
