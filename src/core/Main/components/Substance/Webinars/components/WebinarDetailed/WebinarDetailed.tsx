import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../../../../../../../ui/LoadingSpinner/LoadingSpinner';
import Typography from '../../../../../../../ui/Typography';
import useWebinarQuery, { WebinarResponseType } from '../../hooks/useWebinarQuery';

import classes from './webinarDetailed.module.scss';



export default function WebinarDetailed(): JSX.Element {
	const [response, setResponse] = useState<WebinarResponseType['data'] | undefined>();
	const { id: webinarId } = useParams<{ id: string }>();

	useEffect(() => {
		useWebinarQuery(Number(webinarId)).then((value) => {
			if (value.data) setResponse(value.data);
		});
	}, [webinarId, setResponse]);

	if (!response) return <LoadingSpinner />;

	return (
		<div className={classes.placement}>
			<div className={classes.wrapper}>
				<Typography
					align="center"
					component="h4"
					variant="content_22"
					color="dark_blue"
					weight="ex_bold">
					{response.title}
				</Typography>
				<div className={classes.container}>
					<Typography
						weight="ex_bold"
						component="p"
						variant="content_16"
						color="dark_blue">
						{moment(response.created_at).format('DD/MM/YYYY')}
					</Typography>
					<Typography
						component="p"
						variant="content_16"
						className={classes.container__content}>
						{response.content}
					</Typography>
					<img
						className={classes.snapShotImg}
						src={`https://api.finlogix.com/${response.analysis_snapshot}`}
					/>
				</div>
			</div>
		</div>
	);
}
