import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
}
class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ user_id }: IRequest): Promise<number> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }
    if (user.admin) {
      throw new AppError("O administrador não pode ser deletado!");
    }
    const total = await this.usersRepository.delete(user.id);
    return total;
  }
}
export { DeleteUserUseCase };
