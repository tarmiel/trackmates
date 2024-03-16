const GroupValidationRule = {
	FIELD_MINIMUM_LENGTH: 1,
	GROUP_KEY_MAXIMUM_LENGTH: 25,
	GROUP_KEY_MINIMUM_LENGTH: 3,
	GROUP_NAME_MAXIMUM_LENGTH: 25,
	GROUP_NAME_MINIMUM_LENGTH: 3,
	ID_MINIMUM_VALUE: 1,
} as const;

export { GroupValidationRule };
