const UserValidationRule = {
	EMAIL_MINIMUM_LENGTH: 1,
	FIELD_MINIMUM_LENGTH: 1,
	FIRSTNAME_MAX_LENGTH: 35,
	FIRSTNAME_MINIMUM_LENGTH: 2,
	LASTNAME_MAX_LENGTH: 35,
	LASTNAME_MINIMUM_LENGTH: 2,
	PASSWORD_MAX_LENGTH: 26,
	PASSWORD_MINIMUM_LENGTH: 8,
} as const;

export { UserValidationRule };
