import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	public ENV: EnvironmentSchema;

	public constructor() {
		this.ENV = this.envSchema;
	}

	private get envSchema(): EnvironmentSchema {
		return {
			API: {
				ORIGIN_URL: import.meta.env["VITE_APP_API_ORIGIN_URL"] as string,
				SOCKET_SERVER_URL: import.meta.env[
					"VITE_APP_SOCKET_SERVER_URL"
				] as string,
			},
			APP: {
				ENVIRONMENT: import.meta.env["VITE_APP_NODE_ENV"] as ValueOf<
					typeof AppEnvironment
				>,
			},
			STRIPE: {
				PUBLIC_KEY: import.meta.env["VITE_APP_STRIPE_PUBLIC_KEY"] as string,
			},
		};
	}
}

export { BaseConfig };
