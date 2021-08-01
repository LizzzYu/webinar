import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { FORM_LOGIN } from '../../../../forms/form';
import { validateRequired } from '../../../../forms/validator/validateRequired';
import InputField from '../../../../forms/InputField';
import ButtonBase from '../../../../ui/ButtonBase';
import Typography from '../../../../ui/Typography';
import { useLogin } from './hooks/useLogin';

import classes from './loginForm.module.scss';
import { connect } from 'react-redux';
import { RoutePaths } from '../../routePath';
// import { login } from '../../../../redux/actions/auth';

export interface LoginFormValues {
	account: string;
	password: string;
}

function LoginForm(props: InjectedFormProps<LoginFormValues>): JSX.Element {
	const { valid, handleSubmit } = props;
  const history = useHistory();
  const [mailErrorMessage, setMailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const onSubmit = (data: LoginFormValues) => {
    if (!data) return;
  
    useLogin(data.account, data.password).then((data) => {  
      if (!data.user) {
        setMailErrorMessage(data?.errors?.email[0] ?? '');
        setPasswordErrorMessage(data.error ?? '')
        return;
      }

      history.push(`/${RoutePaths.MAIN}`)
    })
  }

	// const onSubmit = (data: LoginFormValues) => {
  //   login(data.account, data.password)

	// 	history.push('/main');
	// 	window.location.reload();
  // }

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper}>
			<div className={classes.loginSec}>
				<Typography
          className={classes.loginSec__title}
          align="center"
          variant="content_22"
          weight="ex_bold">
					User Login
				</Typography>
				<div className={classes.loginSec__form}>
					<Field
						required
						validate={validateRequired}
						name="account"
						label="Account"
            placeholder="Email"
            submitErrorMessage={mailErrorMessage}
						component={InputField}
					/>
					<Field
						required
            type="password"
						validate={validateRequired}
						name="password"
						label="Password"
            placeholder="password"
            submitErrorMessage={passwordErrorMessage}
						component={InputField}
					/>
					<ButtonBase
            type="submit"
						disabled={!valid}
						className={clsx(classes.btn, {
							[classes.disabled]: !valid,
						})}>
						Login
					</ButtonBase>
				</div>
			</div>
		</form>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => {
	const { isLoggedIn } = state.auth;
	const { message } = state.message;
	return {
		isLoggedIn,
		message
	};
}

const Login = connect(
	mapStateToProps,
)(LoginForm);


const formHook = reduxForm<LoginFormValues>({
	form: FORM_LOGIN,
	initialValues: {
		account: '',
		password: '',
	},
});

export default formHook(Login);
