import { User } from "../../../../entities/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
}
class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }
    return user;
  }
}

export { ShowUserProfileUseCase };
