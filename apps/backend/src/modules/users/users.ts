import { encrypt } from "~/libs/modules/encrypt/encrypt.js";

import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

const userRepository = new UserRepository(UserModel, UserDetailsModel);
const userService = new UserService(encrypt, userRepository);

export { userService };

export {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { UserEntity } from "./user.entity.js";
export { type UserService } from "./user.service.js";
export { UserDetailsModel } from "./user-details/user-details.model.js";
