import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { AuthApi } from "./auth-api.js";

const authApi = new AuthApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	type AuthSendUpdatePasswordLinkRequestDto,
	type AuthUpdatePasswordRequestDto,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
export {
	authForgotPasswordValidationSchema,
	authUpdatePasswordValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { authApi };
export { actions, reducer } from "./slices/auth.js";
