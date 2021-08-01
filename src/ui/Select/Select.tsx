import React, { useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';
import type { SelectValue } from './typings';
import arrowRight from '../../assets/right-arrow.png';
import classes from './select.module.scss';

export interface SelectorProps<V extends SelectValue = string | number> {
	value?: V;
	onChange?: (value: V) => void;
	options?: {
		id: SelectValue;
		name: SelectValue;
	}[];
	error?: string;
	disabled?: boolean;
	placeholder?: string;
}

export default function Select<V extends SelectValue>(
	props: SelectorProps<V>
): JSX.Element {
	const {
		value,
		onChange,
		options = [],
		error = null,
		disabled = false,
		placeholder = 'Please Select',
	} = props;

	const [opened, setOpened] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const toggle = disabled ? () => {} : () => setOpened((prev) => !prev);

	const display = useMemo(() => {
		if (!value) return placeholder;

		return options.find((o) => o.id === value)?.name ?? placeholder;
	}, [value, options, placeholder]);

	const onSelect: (value: SelectValue) => void = useCallback(
		(optionValue) => {
			if (!onChange) return undefined;

			if (optionValue !== value) {
				onChange(optionValue as V);
				setOpened(false);
			}
		},
		[value, onChange, setOpened]
	);

	return (
		<div className={classes.wrapper}>
			<div
				role="presentation"
				onClick={toggle}
				className={clsx(classes.select, {
					[classes.disabled]: disabled,
					[classes.error]: !!error,
				})}
			>
				<span
					className={clsx(classes.selectedSpan, {
						[classes.disabled]: disabled,
						[classes.isPlaceholder]: display === placeholder,
					})}
				>
					{display}
				</span>
				<img className={classes.arrowDown} src={arrowRight} />
			</div>
			{opened ? (
				<div className={classes.popup}>
					{options.map((option) => {
						const selected = value === option.id;

						return (
							<button
								key={`${option.id}-select-option`}
								type="button"
								disabled={disabled}
								onClick={() => onSelect(option.id)}
								className={clsx(classes.optionButton, {
									[classes.selected]: selected,
								})}>
								<span className={classes.optionEllipsis}>{option.name}</span>
							</button>
						);
					})}
				</div>
			) : null}
			{opened ? (
				<div
					aria-label="close"
					role="presentation"
					onClick={() => setOpened(false)}
					className={classes.backgroundClickArea}
				/>
			) : null}
		</div>
	);
}
