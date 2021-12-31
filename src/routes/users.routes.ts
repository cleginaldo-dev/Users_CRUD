import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authUserController } from "../modules/users/useCases/authUser";
import { createUserController } from "../modules/users/useCases/createUser";
import { deleteUserController } from "../modules/users/useCases/deleteUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";
import { updateUserController } from "../modules/users/useCases/updateUser";

const usersRoutes = Router();

usersRoutes.post("/login", (request, response) =>
  authUserController.handle(request, response)
);

usersRoutes.post("/", ensureAuthenticated, (request, response) =>
  createUserController.handle(request, response)
);

usersRoutes.patch("/:user_id/admin", ensureAuthenticated, (request, response) =>
  turnUserAdminController.handle(request, response)
);

usersRoutes.get("/", ensureAuthenticated, ensureAdmin, (request, response) =>
  listAllUsersController.handle(request, response)
);
usersRoutes.get("/:user_id", ensureAuthenticated, (request, response) =>
  showUserProfileController.handle(request, response)
);

usersRoutes.put("/:user_id", ensureAuthenticated, (request, response) =>
  updateUserController.handle(request, response)
);

usersRoutes.delete(
  "/:user_id",
  ensureAuthenticated,
  ensureAdmin,
  (request, response) => deleteUserController.handle(request, response)
);

export { usersRoutes };
