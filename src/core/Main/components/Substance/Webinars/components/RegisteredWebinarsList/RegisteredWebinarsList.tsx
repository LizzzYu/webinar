import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../../../../ui/LoadingSpinner/LoadingSpinner';
import useFavoritedQuery from '../../hooks/useFavoritedQuery';
import { useGetStartTime } from '../../hooks/useGetStartTime';
import useUnfavorited from '../../hooks/useUnfavourite ';
import WebinarCard from '../WebinarCard';

import classes from './registeredWebinarsList.module.scss';

export default function RegisteredWebinarsList(): JSX.Element {
	const [data, setData] = useState<[]>();

	const unFavorited = (id: number) => {
		useUnfavorited(id);
	};

	const rawData = useFavoritedQuery();
	
	useEffect(() => {
		if (!rawData) return;
		
		useFavoritedQuery()?.then((value) => {
			if (value[0]) setData(value[0]);
		});
	}, [setData, rawData]);
	
	if (!data || data === null || data.length === 0) return <LoadingSpinner />;

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				{(data ?? []).map((card: Record<string, string>) => (
					<WebinarCard
						webinarId={card.id}
						isRegisteredPage
						key={card.id}
						createdAt={card.created_at}
						title={card.title}
						content={card.content}
						startTime={useGetStartTime(card.created_at)}
						onClick={() => unFavorited(Number(card.id))}
					/>
				))}
			</div>
		</div>
	);
}
