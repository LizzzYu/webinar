/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  forwardRef,
  ReactNode,
  CSSProperties,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';
import classes from './typography.module.scss';

export type TypographyComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p' | 'label' | 'span';
export type TypographyVariant = 'content_28' | 'content_22' | 'content_16' | 'content_14' | 'title_16';
export type TypographyWeight = 'normal' | 'bold' | 'ex_bold';
export type TypographyColor =
  | 'inherit'
  | 'main_blue'
  | 'main_red'
  | 'dark_blue'
  | 'error'
  | 'black'
  | 'grey';

export interface TypographyProps {
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
  className?: string;
  color?: TypographyColor;
  component?: TypographyComponent;
  ellipsis?: boolean;
  ellipsisLines?: number,
  disabled?: boolean;
  noWrap?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  pointer?: boolean;
  style?: CSSProperties;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
}

const componentToVariant: { [key in TypographyComponent]?: TypographyVariant } = {
  div: 'content_16',
  p: 'content_16',
  label: 'content_16',
  span: 'content_16',
};

const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const {
    align = 'left',
    children,
    className,
    color,
    component: Component = 'span',
    disabled,
    ellipsis,
    ellipsisLines,
    noWrap,
    pointer,
    style,
    variant: variantProp,
    weight,
    ...rest
  } = props;

  const variant = variantProp || componentToVariant[Component] || (Component as TypographyVariant);

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[align]]: align,
          [classes.asInlineBlock]: Component === 'span',
          [classes[color! as keyof typeof classes]]: color,
          [classes.disabled]: disabled,
          [classes.ellipsis]: ellipsis,
          [classes.noWrap]: noWrap,
          [classes.pointer]: pointer,
          [classes[weight!]]: weight,
        },
        className,
      )}
      style={{
        WebkitLineClamp: ellipsisLines,
        ...style,
      }}>
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';
export default Typography;
