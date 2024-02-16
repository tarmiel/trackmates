import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CourseService } from "./course.service.js";
import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	AddCourseRequestDto,
	CourseSearchRequestDto,
} from "./libs/types/types.js";

class CourseController extends BaseController {
	private courseService: CourseService;

	public constructor(logger: Logger, courseService: CourseService) {
		super(logger, APIPath.COURSES);

		this.courseService = courseService;

		this.addRoute({
			handler: (options) =>
				this.findAllByVendor(
					options as APIHandlerOptions<{
						params: CourseSearchRequestDto;
					}>,
				),
			method: "GET",
			path: CoursesApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.addCourse(
					options as APIHandlerOptions<{
						body: AddCourseRequestDto;
					}>,
				),
			method: "POST",
			path: CoursesApiPath.ROOT,
		});
	}

	private async addCourse({
		body,
	}: APIHandlerOptions<{
		body: AddCourseRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.addCourse(body),
			status: HTTPCode.CREATED,
		};
	}

	private async findAllByVendor({
		params,
	}: APIHandlerOptions<{
		params: CourseSearchRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.findAllByVendor(params),
			status: HTTPCode.OK,
		};
	}
}

export { CourseController };
