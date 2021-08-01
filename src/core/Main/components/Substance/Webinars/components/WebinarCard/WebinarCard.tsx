import React from 'react';
import clsx from 'clsx';
import { change } from 'redux-form';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import rightArrowBtn from '../../../../../../../assets/right_arrow_btn.png';
import Typography from '../../../../../../../ui/Typography';
import ButtonBase from '../../../../../../../ui/ButtonBase';
import { getAuthToken } from '../../../../../../utils/getAuthToken';
import classes from './webinarCard.module.scss';
import { FORM_REGISTER } from '../../../../../../../forms/form';
import { RoutePaths } from '../../../../../routePath';

export interface CardProps {
	createdAt: string;
	title: string;
	content: string;
	startTime: string;
	onClick: () => void;
	isRegisteredPage?: boolean;
	webinarId?: string;
}

export default function WebinarCard({
	createdAt,
	title,
	content,
	startTime,
	onClick,
	isRegisteredPage = false,
	webinarId,
}: CardProps): JSX.Element {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<div className={classes.card__wrapper}>
			<div className={classes.card__content__wrapper}>
				<div className={clsx(classes.card__info, classes.card__grid__column)}>
					<p className={classes.card__info__createAt}>
						{moment(createdAt).format('DD/MM/YYYY')}
					</p>
					<div
						className={clsx(
							classes.card__info__titleContent,
							classes.card__grid__column
						)}>
						<Typography
							component="h4"
							ellipsis
							ellipsisLines={2}
							variant="content_16"
							color="main_blue"
							className={classes.card__info__title}>
							{title}
						</Typography>
						<Typography
							component="div"
							ellipsis
							ellipsisLines={3}
							variant="content_14"
							weight="normal"
							color="black">
							{content}
						</Typography>
					</div>
					<p className={classes.card__info__thinText}>{startTime}</p>
				</div>
				<div className={classes.card__register__wrapper}>
					{isRegisteredPage ? (
						<ButtonBase
							onClick={onClick}
							className={classes.card__register__text}>
							Unregister
						</ButtonBase>
					) : (
						<ButtonBase
							className={classes.card__register__text}
							onClick={() => {
								const token = getAuthToken();

								if (!token) {
									return history.push(`/${RoutePaths.LOGIN}`);
								} else {
									dispatch(change(
										FORM_REGISTER,
										'topic',
										webinarId,
									))
									onClick();
								}
							}}>
							Register Now
						</ButtonBase>
					)}
					<ButtonBase onClick={() => {
						history.push(`/${RoutePaths.WEBINAR}/${webinarId}`)
					}}>
						<img src={rightArrowBtn} alt="right_arrow-btn" />
					</ButtonBase>
				</div>
			</div>
		</div>
	);
}
