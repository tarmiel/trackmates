import { AppRoute } from "~/libs/enums/enums.js";

import { type IconName, type ValueOf } from "./types.js";

type MenuItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

export { type MenuItem };
