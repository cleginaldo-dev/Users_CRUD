import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  const { user_id } = request;
  const usersRepository = UsersRepository.getInstance();
  const { admin } = await usersRepository.findById(user_id);

  if (admin) {
    return next();
  }
  return response.status(401).json({
    error: "Usuário não é administrador e portanto não tem permissão!",
  });
}
