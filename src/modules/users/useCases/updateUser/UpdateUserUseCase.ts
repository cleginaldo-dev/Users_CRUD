import { User } from "../../../../entities/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
  logged_user_id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }
  async execute({
    user_id,
    logged_user_id,
    name,
    email,
    password,
    admin,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe!");
    }

    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!user.admin && admin && !loggedUser.admin) {
      throw new AppError("O usuário logado não tem permissão para tornar o usuário editado em admin!");
    }

    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists.id !== user_id) {
      throw new AppError("O email já existe no bando de dados!");
    }

    Object.assign(user, {
      name,
      email,
      password,
      updated_at: new Date(),
      admin,
    });

    const userUpdate = await this.usersRepository.save(user);
    return userUpdate;
  }
}

export { UpdateUserUseCase };
