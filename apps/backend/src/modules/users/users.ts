import { encript } from "~/libs/modules/encript/encript.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

const userRepository = new UserRepository(UserModel, UserDetailsModel);
const userService = new UserService(encript, userRepository);
const userController = new UserController(logger, userService);

export { userController, userService };

export {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserWithPassword,
} from "./libs/types/types.js";
export {
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
