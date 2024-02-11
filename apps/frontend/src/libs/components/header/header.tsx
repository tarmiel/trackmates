import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";

import { Image } from "../image/image.js";

type Properties = {
	user: {
		image: {
			url: string;
		} | null;
	} | null;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
	return (
		<header>
			<div>Search input</div>
			{user ? (
				<div>
					<Image
						alt="user-avatar"
						height="48"
						isCircular
						src={user.image?.url ?? ""}
						width="48"
					/>
				</div>
			) : (
				<NavLink to={AppRoute.SIGN_IN}>Sign in</NavLink>
			)}
		</header>
	);
};

export { Header };
