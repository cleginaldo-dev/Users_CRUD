import { hash } from "bcryptjs";
import { Request, Response } from "express";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { logged_user_id } = request;
    const { name, email, password, admin } = request.body;
    const { user_id } = request.params;
    const passwordHash = await hash(password, 8);

    const userUpdate = await this.updateUserUseCase.execute({
      name,
      email,
      user_id,
      logged_user_id,
      password: passwordHash,
      admin,
    });
    return response.json(userUpdate);
  }
}
export { UpdateUserController };
