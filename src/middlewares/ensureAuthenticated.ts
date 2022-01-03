import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Receber token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  try {
    // Verificar se o token é válido
    const [, token] = authToken.split(" ");
    // Recuperar informaçẽs de usuário
    const { sub } = verify(
      token,
      "6a204bd89f3c8348afd5c77c717a097a"
    ) as IPayload;

    request.logged_user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
