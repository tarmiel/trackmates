import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { CourseSectionsApi } from "./course-sections-api.js";

const courseSectionsApi = new CourseSectionsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { courseSectionsApi };
export { actions, reducer } from "./slices/course-sections.js";