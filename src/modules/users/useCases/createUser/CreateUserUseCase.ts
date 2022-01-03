import { User } from "../../../../entities/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email já existe!");
    }
    const createdUser = await this.userRepository.create({
      name,
      email,
      password,
    });
    return createdUser;
  }
}
export { CreateUserUseCase };
