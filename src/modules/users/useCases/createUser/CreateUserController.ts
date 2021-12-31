import { hash } from "bcryptjs";
import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUserCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const passwordHash = await hash(password, 8);
    const createdUser = await this.createUserUserCase.execute({
      name,
      email,
      password: passwordHash,
    });
    return response.status(201).json(createdUser);
  }
}
export { CreateUserController };
