import React from 'react';
import clsx from 'clsx';
import headerIcons from '../../../../assets/header-icons.png';
import logo from '../../../../assets/logo.png';
import down from '../../../../assets/down.png';
import downBlack from '../../../../assets/down-black.png';
import mobileHeader from '../../../../assets/header-mobile.png';
import { CURRENCY_CONS, DROP_DOWN_CONS } from './constants';
import Typography from '../../../../ui/Typography';
import ButtonBase from '../../../../ui/ButtonBase';
import classes from './header.module.scss';
import { useHistory } from 'react-router';
import { useLogOut } from '../LoginForm/hooks/useLogOut';
import { useMeQuery } from '../../../hooks/useMeQuery';
import { RoutePaths } from '../../routePath';

interface RowProps {
	title: string;
	color: string;
	num: string;
}

interface RowDropDownProps {
	title: RowProps['title'];
}

function Row({ title, color, num }: RowProps): JSX.Element {
	return (
		<div className={classes.rowWrapper}>
			<Typography>{title}</Typography>
			{color === 'red' ? (
				<Typography color="main_red">{num}</Typography>
			) : (
				<Typography color="main_blue">{num}</Typography>
			)}
		</div>
	);
}

function RowDropDown({ title }: RowDropDownProps): JSX.Element {
	return (
		<div className={classes.rowWrapper}>
			{title}
			<img style={{ width: '13px' }} src={downBlack} alt="down" />
		</div>
	);
}

export default function Header(): JSX.Element {
	const history = useHistory();
	const me = useMeQuery();

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.headerTopWrapper}>
					<div className={classes.headerTop}>
						<div className={classes.constantRow}>
							{CURRENCY_CONS.map((up) => (
								<Row
									key={up.id}
									title={up.name}
									color={up.color}
									num={up.num}
								/>
							))}
						</div>
						<div className={classes.headerTopActionRow}>
							{me.user ? me.user.username : ''}
							<img
								style={{ width: '70px' }}
								src={headerIcons}
								alt="header-icons"
							/>
							<p className={classes.headerText}>
								EN
								<img
									style={{ width: '20px', padding: '0 0 0 5px' }}
									src={down}
									alt="down"
								/>
							</p>
						</div>
					</div>
				</div>
				<div className={classes.headerDownWrapper}>
					<div className={classes.headerDown}>
						<div className={classes.headerDownLeftSec}>
							<img style={{ width: '100px' }} src={logo} alt="logo" />
							<div className={classes.rowDropDownWrapper}>
								{DROP_DOWN_CONS.map((down) => (
									<RowDropDown key={down.id} title={down.name} />
								))}
							</div>
						</div>
						<div className={classes.btnGroup}>
							<ButtonBase
								onClick={() => history.push(`/${RoutePaths.LOGIN}`)}
								className={clsx(classes.loginBtn, classes.btn)}>
								Login
							</ButtonBase>
							<ButtonBase
								onClick={() => {
									useLogOut();
									history.push(`/${RoutePaths.LOGIN}`);
								}}
								className={clsx(classes.logOutBtn, classes.btn)}>
								Logout
							</ButtonBase>
						</div>
					</div>
				</div>
				<div className={classes.mobileHeader}>
					<img className={classes.mobileHeader__img} src={mobileHeader} />
					<div className={classes.mobileHeader__btnGroup}>
						<div>
							{me.user ? me.user.username : ''}
							<ButtonBase
								onClick={() => history.push(`/${RoutePaths.LOGIN}`)}
								className={clsx(classes.loginBtn, classes.btn)}>
								Login
							</ButtonBase>
						</div>
						<ButtonBase
							onClick={() => {
								useLogOut();
								history.push(`/${RoutePaths.LOGIN}`);
							}}
							className={clsx(classes.logOutBtn, classes.btn)}>
							Logout
						</ButtonBase>
					</div>
				</div>
			</div>
			<div className={classes.background} />
		</>
	);
}
