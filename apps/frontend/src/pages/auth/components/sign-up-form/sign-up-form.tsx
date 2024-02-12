import logo from "~/assets/img/svg/logo.svg";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["main-container"]}>
			<div
				className={getValidClassNames(
					styles["form-container"],
					styles["sign-in-form"],
				)}
			>
				<h1 className={styles["logo-wrapper"]}>
					{" "}
					<img alt="Trackmates Logo" src={logo} />
					TrackMates
				</h1>

				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<div>
						<h2 className={styles["title"]}>Create an account</h2>
						<p className={styles["subtitle"]}>
							Already have an account? Go to{" "}
							<Link className={styles["link"]} to={AppRoute.SIGN_IN}>
								{" "}
								Log In
							</Link>
						</p>
					</div>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="First name"
						name="firstName"
						type="text"
					/>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="Last name"
						name="lastName"
						type="text"
					/>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="Email"
						name="email"
						type="text"
					/>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="Password"
						name="password"
						type="password"
					></Input>
					<Input
						color="dark"
						control={control}
						errors={errors}
						label="Confirm password"
						name="confirmPassword"
						type="password"
					/>
					<Button color="primary" label="Create an account" type="submit" />
				</form>
			</div>
		</div>
	);
};

export { SignUpForm };
