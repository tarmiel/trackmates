import { z } from "zod";

import { userEmail } from "./user-email.validation-schema.js";
import { userPassword } from "./user-password.validation-schema.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		email: userEmail,
		password: userPassword,
	})
	.required();

export { userSignUp };
