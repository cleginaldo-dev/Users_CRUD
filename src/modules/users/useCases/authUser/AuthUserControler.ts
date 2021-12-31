import { Request, Response } from "express";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const { token, user } = await this.authUserUseCase.execute({
      email,
      password,
    });
    return response.json({ token, user });
  }
}
export { AuthUserController };
