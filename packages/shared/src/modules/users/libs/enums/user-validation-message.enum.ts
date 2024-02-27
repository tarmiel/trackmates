import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	ADJACENT_HYPHEN_APOSTROPHE: "Avoid hyphen-apostrophe combination",
	EMAIL_DOMAIN_PART_MAXIMUM_LENGTH: `Max. domain part length – ${UserValidationRule.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH} characters`,
	EMAIL_INVALID_FORMAT: "Email is invalid",
	EMAIL_LOCAL_PART_MAXIMUM_LENGTH: `Max. local part length – ${UserValidationRule.EMAIL_LOCAL_PART_MAXIMUM_LENGTH} characters`,
	FIELD_REQUIRE: "This field is required",
	FIRST_LAST_CHARACTERS_ONLY_LETTERS:
		"First and last characters must be letters",
	FIRST_NAME_INVALID_CHARACTERS: "Use only A-Z, a-z, hyphen and apostrophe",
	FIRST_NAME_MAXIMUM_LENGTH: `Maximum length – ${UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH} characters`,
	FIRST_NAME_MINIMUM_LENGTH: `Minimum length – ${UserValidationRule.FIRST_NAME_MINIMUM_LENGTH} characters`,
	LAST_NAME_INVALID_CHARACTERS: "Use only A-Z, a-z, hyphen and apostrophe",
	LAST_NAME_MAXIMUM_LENGTH: `Last name must not be more than ${UserValidationRule.LAST_NAME_MAXIMUM_LENGTH} characters long`,
	LAST_NAME_MINIMUM_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME_MINIMUM_LENGTH} characters long`,
	NICKNAME_AT_LEAST_ONE_LETTER: "Use at least one Latin letter",
	NICKNAME_INVALID_CHARACTERS: "Use only a-z, 0-9 & underscores",
	NICKNAME_MAXIMUM_LENGTH: `Maximum length – ${UserValidationRule.NICKNAME_MAXIMUM_LENGTH} characters`,
	NICKNAME_MINIMUM_LENGTH: `Minimum length – ${UserValidationRule.NICKNAME_MINIMUM_LENGTH} characters`,
	PASSWORD_INVALID_FORMAT: "Use only A-Z, a-z, 0-9 and special characters",
	PASSWORD_MAXIMUM_LENGTH: `Maximum length – ${UserValidationRule.PASSWORD_MAXIMUM_LENGTH} characters`,
	PASSWORD_MINIMUM_LENGTH: `Minimum length – ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters`,
} as const;

export { UserValidationMessage };
