import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "../../../../entities/User";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { instanceToPlain } from "class-transformer";

interface IAuthUserRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
}

class AuthUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({
    email,
    password,
  }: IAuthUserRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email ou senha incorretos");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos");
    }

    const token = sign(
      {
        email: user.email,
      },
      "6a204bd89f3c8348afd5c77c717a097a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return instanceToPlain({ token, user }) as any;
  }
}
export { AuthUserUseCase };
