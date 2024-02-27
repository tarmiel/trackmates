import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type CourseSearchFilterDto,
	type CoursesResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CourseApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.COURSES, storage });
	}

	public async getAll(
		filter: CourseSearchFilterDto,
	): Promise<CoursesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CoursesResponseDto>();
	}
}

export { CourseApi };