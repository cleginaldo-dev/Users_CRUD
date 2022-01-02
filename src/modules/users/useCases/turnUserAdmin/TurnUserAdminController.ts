import { Request, Response } from "express";

import { IRequest, TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const userAdmin = await this.turnUserAdminUseCase.execute({
      user_id,
    } as IRequest);
    return response.json(userAdmin);
  }
}
export { TurnUserAdminController };
