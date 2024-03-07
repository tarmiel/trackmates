import defaultAvatar from "~/assets/img/default-avatar.png";
import profileCharacter from "~/assets/img/profile-character.svg";
import { Button, Image, Input, Select } from "~/libs/components/components.js";
import { AppTitle } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useMemo,
	useRef,
} from "~/libs/hooks/hooks.js";
import { type SelectOption, type ValueOf } from "~/libs/types/types.js";
import { actions as filesActions } from "~/modules/files/files.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
	UserSex,
	userProfileValidationSchema,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});
	const fileInputReference = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, reset } =
		useAppForm<UserProfileRequestDto>({
			defaultValues: {
				firstName: user.firstName,
				lastName: user.lastName,
				nickname: user.nickname ?? "",
				sex: user.sex,
			},
			validationSchema: userProfileValidationSchema,
		});

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const [file] = event.target.files ?? [];

			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				void dispatch(filesActions.updateUserAvatar(formData));
			}
		},
		[dispatch],
	);

	const handleInputChange = useCallback(
		(formData: UserProfileRequestDto): void => {
			void dispatch(
				usersActions.updateProfile({
					id: user.id,
					profilePayload: formData,
				}),
			);
		},
		[dispatch, user.id],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleInputChange)(event_);
		},
		[handleSubmit, handleInputChange],
	);

	const handleResetForm = useCallback(() => {
		reset();
	}, [reset]);

	const handleOpenFileInput = useCallback((): void => {
		if (fileInputReference.current) {
			fileInputReference.current.click();
		}
	}, [fileInputReference]);

	const placeholder = `${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}_${user.id}`;

	useAppTitle(AppTitle.PROFILE);

	const sexSelectOptions = useMemo<SelectOption[]>(() => {
		const userSexToTheSelectLabel: Record<ValueOf<typeof UserSex>, string> = {
			[UserSex.FEMALE]: "Female",
			[UserSex.MALE]: "Male",
			[UserSex.PREFER_NOT_TO_SAY]: "Prefer not to say",
		};

		return Object.values(UserSex).map((sex) => {
			return {
				label: userSexToTheSelectLabel[sex],
				value: sex,
			};
		});
	}, []);

	return (
		<>
			<div className={styles["container"]}>
				<span className={styles["profile-title"]}>My profile</span>
				<form name="profile" onSubmit={handleFormSubmit}>
					<div className={styles["avatar-container"]}>
						<div className={styles["profile-image-wrapper"]}>
							<Image
								alt="avatar"
								className={styles["profile-image"]}
								shape="circle"
								src={user.avatarUrl ?? defaultAvatar}
							/>
							<Button
								label="Change photo"
								onClick={handleOpenFileInput}
								size="small"
								style="secondary"
							/>
							<input
								accept="image/*"
								className={styles["file-input"]}
								onChange={handleFileChange}
								ref={fileInputReference}
								type="file"
							/>
						</div>
					</div>
					<div className={styles["profile-inputs"]}>
						<fieldset className={styles["fieldset"]}>
							<Input
								color="light"
								control={control}
								errors={errors}
								label="First Name"
								name="firstName"
								type="text"
							/>
							<Input
								color="light"
								control={control}
								errors={errors}
								label="Last Name"
								name="lastName"
								type="text"
							/>
							<Input
								color="light"
								control={control}
								errors={errors}
								label="Nickname"
								name="nickname"
								placeholder={placeholder}
								type="text"
							/>
							<Select
								control={control}
								errors={errors}
								label="Sex"
								name="sex"
								options={sexSelectOptions}
								placeholder="Select sex"
							/>
						</fieldset>
					</div>
					<Image
						alt="profile character"
						className={styles["profile-character"]}
						height="176"
						src={profileCharacter}
						width="176"
					/>
					<div className={styles["btnWrapper"]}>
						<Button
							className={styles["button"]}
							label="Cancel"
							onClick={handleResetForm}
							size="small"
							style="secondary"
						/>
						<Button
							className={styles["button"]}
							label="Update"
							size="small"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export { Profile };
