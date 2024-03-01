import sanitizeHtml from "sanitize-html";

import { MAXIMUM_CONTENT_LENGTH, START_INDEX } from "./libs/constants.js";

type Properties = {
	string: string;
};

const Content: React.FC<Properties> = ({ string }: Properties) => {
	const sanitizedString = sanitizeHtml(string);

	if (string.length <= MAXIMUM_CONTENT_LENGTH) {
		return <div dangerouslySetInnerHTML={{ __html: sanitizedString || "" }} />;
	}

	const truncatedContent =
		string.slice(START_INDEX, MAXIMUM_CONTENT_LENGTH) + "...";

	return <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />;
};

export { Content };