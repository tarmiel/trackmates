import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/friends/friends.js";

import { FriendList } from "../friend-list/friend-list.js";

const PotentialFriends: React.FC = () => {
	const { potentialFriends } = useAppSelector(({ friends }) => ({
		potentialFriends: friends.potentialFriends,
	}));
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(actions.getPotentialFriends());
	}, [dispatch]);

	return <FriendList friends={potentialFriends} />;
};

export { PotentialFriends };
