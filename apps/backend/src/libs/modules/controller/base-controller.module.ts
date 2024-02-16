import { type Logger } from "~/libs/modules/logger/logger.js";
import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

import {
	type APIHandler,
	type APIHandlerOptions,
	type Controller,
	type ControllerRouteParameters,
} from "./libs/types/types.js";

class BaseController implements Controller {
	private apiUrl: string;

	private logger: Logger;

	public routes: ServerApplicationRouteParameters[];

	public constructor(logger: Logger, apiPath: string) {
		this.logger = logger;
		this.apiUrl = apiPath;
		this.routes = [];
	}

	private async mapHandler(
		handler: APIHandler,
		request: Parameters<ServerApplicationRouteParameters["handler"]>[0],
		reply: Parameters<ServerApplicationRouteParameters["handler"]>[1],
	): Promise<void> {
		this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

		const handlerOptions = await this.mapRequest(request);
		const { payload, status } = await handler(handlerOptions);

		return await reply.status(status).send(payload);
	}

	private async mapRequest(
		request: Parameters<ServerApplicationRouteParameters["handler"]>[0],
	): Promise<APIHandlerOptions> {
		const { body, params, query, user } = request;
		const uploadedFile = await request.file();

		return {
			body,
			params,
			query,
			uploadedFile: uploadedFile ?? null,
			user: user ?? null,
		};
	}

	public addRoute(options: ControllerRouteParameters): void {
		const { handler, path } = options;
		const fullPath = this.apiUrl + path;

		this.routes.push({
			...options,
			handler: (request, reply) => this.mapHandler(handler, request, reply),
			path: fullPath,
		});
	}
}

export { BaseController };
