import { Request, Response } from "express";

import { DeleteUserUseCase, IRequest } from "./DeleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const total = await this.deleteUserUseCase.execute({
      user_id,
    } as IRequest);
    return response.json({ total });
  }
}
export { DeleteUserController };
