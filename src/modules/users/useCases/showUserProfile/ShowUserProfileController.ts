import { Request, Response } from "express";

import { IRequest, ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const user = await this.showUserProfileUseCase.execute({
      user_id,
    } as IRequest);
    return response.json(user);
  }
}
export { ShowUserProfileController };
