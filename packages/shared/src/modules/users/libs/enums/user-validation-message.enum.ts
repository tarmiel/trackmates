import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_INVALID_FORMAT: "The email format is not correct",
	EMAIL_REQUIRE: "The field is required",
	EMAIL_UNIQUE: "This email is already registered",
	EMAIL_WRONG: "Email is wrong",
	FIELD_REQUIRE: "The field is required",
	FIRSTNAME_INVALID_FORMAT: "Only latin letters are allowed",
	FIRSTNAME_MAX_LENGTH: `The field shouldn't contain more than ${UserValidationRule.FIRSTNAME_MAX_LENGTH} characters`,
	FIRSTNAME_MIN_LENGTH: `The field should contain at least ${UserValidationRule.FIRSTNAME_MINIMUM_LENGTH} characters`,
	LASTNAME_INVALID_FORMAT: "Only latin letters are allowed",
	LASTNAME_MAX_LENGTH: `The field shouldn't contain more than ${UserValidationRule.LASTNAME_MAX_LENGTH} characters`,
	LASTNAME_MIN_LENGTH: `The field should contain at least ${UserValidationRule.LASTNAME_MINIMUM_LENGTH} characters`,
	PASSSWORD_MAX_LENGTH: `The field shouldn't contain more than ${UserValidationRule.PASSWORD_MAX_LENGTH} characters`,
	PASSWORD_MIN_LENGTH: `The field should contain at least ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters`,
	PASSWORD_SHORT: `Password is too short (${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters at least)`,
	PASSWORD_WEAK: "Password is too weak",
} as const;

export { UserValidationMessage };
