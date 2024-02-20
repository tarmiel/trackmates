const AppRoute = {
	ANY: "*",
	FRIENDS: "/friends",
	PROFILE_$ID: "/profile/:userId",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
