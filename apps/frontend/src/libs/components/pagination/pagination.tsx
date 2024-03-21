import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { PaginationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	currentPage: number;
	pages: number[];
	pagesCount: number;
};

const ONE_ITEM_COUNT = 1;
const NO_ITEMS_PAGE_COUNT = 0;

const Pagination: React.FC<Properties> = ({
	currentPage,
	pages,
	pagesCount,
}: Properties) => {
	const isFirstPage = currentPage === ONE_ITEM_COUNT;
	const isLastPage =
		currentPage === pagesCount || pagesCount === NO_ITEMS_PAGE_COUNT;

	if (pagesCount === ONE_ITEM_COUNT) {
		return null;
	}

	return (
		<nav
			aria-label="pagination"
			className={styles["pagination"]}
			role="navigation"
		>
			<ul className={styles["content"]}>
				<PaginationItem
					href={`?page=${ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>}
					iconName="navFirst"
					isDisabled={isFirstPage}
					label=""
				/>
				<PaginationItem
					href={
						`?page=${currentPage - ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
					iconName="navPrev"
					isDisabled={isFirstPage}
					label=""
				/>
				{pages.map((page) => (
					<PaginationItem
						href={`?page=${page}` as ValueOf<typeof AppRoute>}
						isActive={currentPage === page}
						isDisabled={false}
						key={page}
						label={page.toString()}
					/>
				))}
				<PaginationItem
					href={
						`?page=${currentPage + ONE_ITEM_COUNT}` as ValueOf<typeof AppRoute>
					}
					iconName="navNext"
					isDisabled={isLastPage}
					label=""
				/>
				<PaginationItem
					href={`?page=${pagesCount}` as ValueOf<typeof AppRoute>}
					iconName="navLast"
					isDisabled={isLastPage}
					label=""
				/>
			</ul>
		</nav>
	);
};

export { Pagination };
