import { type HTTP, type HTTPOptions } from "./libs/types/types.ts";

class BaseHttp implements HTTP {
	public load(path: string, options: HTTPOptions): Promise<Response> {
		const { headers, method, payload } = options;

		return fetch(path, {
			body: payload,
			headers,
			method,
		});
	}
}

export { BaseHttp };
