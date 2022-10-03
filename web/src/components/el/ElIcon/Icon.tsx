import classNames from 'classnames';
import React from 'react';

const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  rotate?: number;
}

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface IconComponentProps extends IconBaseProps {
  viewBox?: string;
  component?: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >;
  ariaLabel?: any;
}

const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>(
  (props, ref) => {
    const {
      // affect outter <i>...</i>
      className,

      // affect inner <svg>...</svg>
      component: Component,
      viewBox,
      spin,
      rotate,

      tabIndex,
      onClick,

      // children
      children,
      ...restProps
    } = props;

    // useInsertStyles();

    const classString = classNames('anticon', className);

    const svgClassString = classNames({
      'anticon-spin': !!spin
    });

    const svgStyle = rotate
      ? {
          msTransform: `rotate(${rotate}deg)`,
          transform: `rotate(${rotate}deg)`
        }
      : undefined;

    const innerSvgProps: CustomIconComponentProps = {
      ...svgBaseProps,
      className: svgClassString,
      style: svgStyle,
      viewBox
    };

    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    // component > children
    const renderInnerNode = () => {
      if (Component) {
        return <Component {...innerSvgProps}>{children}</Component>;
      }

      if (children) {
        return (
          <svg {...innerSvgProps} viewBox={viewBox}>
            {children}
          </svg>
        );
      }

      return null;
    };

    let iconTabIndex = tabIndex;
    if (iconTabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    return (
      <span
        role='img'
        {...restProps}
        ref={ref}
        tabIndex={iconTabIndex}
        onClick={onClick}
        className={classString}
      >
        {renderInnerNode()}
      </span>
    );
  }
);

Icon.displayName = 'AntdIcon';

export default Icon;
