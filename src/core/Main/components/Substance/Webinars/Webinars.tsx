import React, { useContext, useEffect, useRef, useState } from 'react';
import WebinarCard from './components/WebinarCard';
import useWebinarListQuery from './hooks/useWebinarListQuery';
import { useGetStartTime } from './hooks/useGetStartTime';
import LoadingSpinner from '../../../../../ui/LoadingSpinner/LoadingSpinner';
import ButtonBase from '../../../../../ui/ButtonBase';
import arrow from '../../../../../assets/right_arrow_3x.png';
import { WebinarContext } from './context';
import classes from './webinars.module.scss';

export interface CardsContainerProps {
	onClick: () => void;
}

export default function Webinars({
	onClick,
}: CardsContainerProps): JSX.Element {
	const [data, setData] = useState<[]>();
	const [totalPage, setTotalPage] = useState<number>();
	const [paginationData, setPaginationData] = useState<never[]>();
	const [isPaginationFirst, setPaginationFirst] = useState<boolean>(false);
	// const [isScroll, setIsScroll] = useState<boolean>(false);
	const { currentPage, setCurrentPage } = useContext(WebinarContext);

	const scrollRef = useRef<HTMLDivElement | null>(null);

	/** 處理 scroll */
	// const scroll = () => {
	// 	if (data && scrollRef.current?.offsetWidth) {
	// 		if (
	// 			scrollRef.current?.offsetWidth + scrollRef.current?.scrollLeft >=
	// 			scrollRef.current?.scrollWidth
	// 		) {
	// 			setIsScroll(true);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	if (isScroll && data) {
	// 		if (isPaginationFirst) setPaginationData(data?.slice(0, 6));
	// 		if (!isPaginationFirst) setPaginationData(data?.slice(6, 12));
	// 	}
	// }, [isScroll, isPaginationFirst]);

	// useEffect(() => {
	// 	if (scrollRef.current) {
	// 		scrollRef.current.addEventListener('scroll', scroll);

	// 		return scrollRef.current.removeEventListener('scroll', scroll);
	// 	}
	// }, []);

	useEffect(() => {
		useWebinarListQuery(currentPage).then((value) => {
			if (value[0]) {
				setData(value[0]);
				setPaginationFirst(!isPaginationFirst);
			}
		});
	}, [setData, currentPage]);

	/** total page 獨立計算 */
	useEffect(() => {
		useWebinarListQuery(currentPage).then((value) => {
			if (value[1].pagination.total_pages)
				setTotalPage(value[1].pagination.total_pages);
		});
	}, [
		useWebinarListQuery(currentPage).then(
			(value) => value[1].pagination.total_pages
		),
	]);

	/** 處理分頁資料 */
	useEffect(() => {
		if (data) {
			if (isPaginationFirst) setPaginationData(data?.slice(0, 6));
			if (!isPaginationFirst) setPaginationData(data?.slice(6, 12));
		}
	}, [isPaginationFirst]);

	if (!paginationData || !totalPage) return <LoadingSpinner />;

	return (
		<div ref={scrollRef} className={classes.wrapper}>
			<div className={classes.containerWrapper}>
				<ButtonBase
					className={classes.leftBtn}
					disabled={currentPage === 1 && isPaginationFirst}
					onClick={() => {
						if (!isPaginationFirst) setPaginationFirst(!isPaginationFirst);
						if (isPaginationFirst) setCurrentPage(currentPage - 1);
					}}>
					<img src={arrow} />
				</ButtonBase>
				<div className={classes.container}>
					{(paginationData ?? []).map((card: Record<string, string>) => (
						<WebinarCard
							key={card.id}
							createdAt={card.created_at}
							title={card.title}
							content={card.content}
							startTime={useGetStartTime(card.created_at)}
							onClick={onClick}
							webinarId={card.id}
						/>
					))}
				</div>
				<ButtonBase
					className={classes.rightBtn}
					disabled={currentPage === totalPage}
					onClick={() => {
						if (isPaginationFirst) setPaginationFirst(!isPaginationFirst);
						if (!isPaginationFirst) setCurrentPage(currentPage + 1);
					}}>
					<img src={arrow} />
				</ButtonBase>
			</div>
		</div>
	);
}
