import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ReadChatMessagesRequestValidation = {
	chatMessageIds: z.ZodArray<z.ZodNumber, z.ArrayCardinality>;
};

const readChatMessagesRequest = z.object<ReadChatMessagesRequestValidation>({
	chatMessageIds: z
		.array(
			z.number().min(ChatMessageValidationRule.MESSAGE_ID_MINIMUM_VALUE, {
				message: ChatMessageValidationMessage.MESSAGE_ID_MINIMUM_VALUE,
			}),
		)
		.min(ChatMessageValidationRule.MESSAGES_IDS_ARRAY_MINIMUM_LENGTH, {
			message: ChatMessageValidationMessage.ARRAY_MINIMUM_SIZE,
		}),
});

export { readChatMessagesRequest };