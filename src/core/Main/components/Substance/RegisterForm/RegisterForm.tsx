/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FocusEvent, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Typography from '../../../../../ui/Typography';
import InputField from '../../../../../forms/InputField';
import SelectField from '../../../../../forms/SelectField/SelectField';
import { FORM_REGISTER } from '../../../../../forms/form';
import { useFormValues } from '../../../../../forms/hooks/useFormValues';
import { validateEmail } from '../../../../../forms/validator/validateEmail';
import { validateRequired } from '../../../../../forms/validator/validateRequired';
import LoadingSpinner from '../../../../../ui/LoadingSpinner/LoadingSpinner';
import ButtonBase from '../../../../../ui/ButtonBase';
import Select from '../../../../../ui/Select';
import Input from '../../../../../ui/Input/Input';
import useWebinarListQuery from '../Webinars/hooks/useWebinarListQuery';
import useFavorited from './hooks/useFavorited';
import { WebinarContext } from '../Webinars/context';

import classes from './register.module.scss';

export interface RegisterFormValues {
	selectedId: number;
	firstName: string;
	lastName: string;
	email: string;
}

function RegisterForm(
	props: InjectedFormProps<RegisterFormValues>
): JSX.Element {
	const { handleSubmit, valid, reset } = props;
	const [data, setData] = useState<[]>();
	const [mailErrorMessage, setMailErrorMessage] = useState<string | null>('');
	const { currentPage } = useContext(WebinarContext);

	const selectedId: number = useFormValues('topic');

	useEffect(() => {
		useWebinarListQuery(currentPage).then((value: any) => {
			if (value[0]) setData(value[0]);
		});
	}, [setData, currentPage]);

	if (!data) return <LoadingSpinner />;

	const options = (data ?? []).map((d: Record<string, string>) => {
		if (!data) return null;

		return Object.assign({},
			{
				id: d.id,
			},
			{
				name: d.title,
			}
		);
	});

	const onEmailBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (validateEmail(event.target.value) !== '') {
			setMailErrorMessage(validateEmail(event.target.value));
		} else {
			setMailErrorMessage('');
		}
	};

	const onSubmit = () => {
		useFavorited([selectedId]);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper}>
			<div className={classes.form}>
				<h3 className={classes.form__title}>Register for a Webinar now</h3>
				<Typography
					align="center"
					color="black"
					component="p"
					weight="normal"
					variant="content_16"
					className={classes.form__description}>
					Please fill in the form below and you will be contacted by one of our
					professional business experts.
				</Typography>
				<div className={classes.form__contentWrapper}>
					<Field
						required
						validate={validateRequired}
						name="topic"
						label="Topic"
						options={options}
						component={SelectField}
					/>
					<Field
						required
						validate={validateRequired}
						name="firstName"
						label="First Name"
						component={InputField}
					/>
					<Field
						required
						validate={validateRequired}
						name="lastName"
						label="Last Name"
						component={InputField}
					/>
					<Field
						required
						validate={[validateRequired, validateEmail]}
						name="email"
						label="Email"
						submitErrorMessage={mailErrorMessage}
						onBlur={onEmailBlur}
						component={InputField}
					/>
					<div className={classes.phone}>
						Phone
						<div className={classes.phone__columns}>
							<Select placeholder="+61" />
							<Input placeholder="" />
						</div>
					</div>
					<div className={classes.phone}>
						Mobile Authentication
						<div className={classes.phone__columns}>
							<Input placeholder="Get Code" />
							<Input placeholder="" />
						</div>
					</div>
					<ButtonBase
						type="submit"
						disabled={!valid}
						className={clsx(classes.btn, {
							[classes.disabled]: !valid,
						})}>
						Register
					</ButtonBase>
				</div>
			</div>
		</form>
	);
}

const formHook = reduxForm<RegisterFormValues>({
	form: FORM_REGISTER,
	initialValues: {
		firstName: '',
		lastName: '',
		email: '',
	},
});

export default formHook(RegisterForm);
