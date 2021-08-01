import { RefObject } from 'react';

export type SmoothScrollElement = RefObject<HTMLElement> | Element | null;

export default function smoothScrollIntoView(el: SmoothScrollElement): void {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const target = el as any;

	(target.current ?? target)?.scrollIntoView({
		behavior: 'smooth',
	});
}
