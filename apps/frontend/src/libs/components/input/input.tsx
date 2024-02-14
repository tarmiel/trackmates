import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	color?: "dark" | "light";
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
	width?: string;
};

const Input = <T extends FieldValues>({
	color = "light",
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
	width = "100%",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const inputClasses = getValidClassNames(
		styles["input"],
		styles[color],
		hasError && styles["error-input"],
	);

	return (
		<label className={styles["container"]}>
			<span className={styles["heading"]}>{label}</span>
			<input
				className={inputClasses}
				{...field}
				placeholder={placeholder}
				style={{ width: width }}
				type={type}
			/>
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };
