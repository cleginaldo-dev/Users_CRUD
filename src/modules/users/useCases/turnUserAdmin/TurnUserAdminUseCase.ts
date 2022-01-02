import { User } from "../../../../entities/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
}
class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe!");
    }
    if (user.admin) {
      throw new AppError("O usuário Já é um administrador!");
    }

    Object.assign(user, {
      admin: true,
      updated_at: new Date(),
    });

    const userAdmin = await this.usersRepository.save(user);
    return userAdmin;
  }
}
export { TurnUserAdminUseCase };
