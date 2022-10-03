// @ts-nocheck
import React, { Component } from 'react';
import {
  Switch,
  matchPath,
  withRouter,
  useHistory,
  SwitchProps
  //   __RouterContext
} from 'react-router-dom';

const isUndefined = (val) => typeof val === 'undefined';
const isNull = (val) => val === null;
const isExist = (val) => !(isUndefined(val) || isNull(val));
// const isUsingNewContext = isExist(__RouterContext) || isExist(useHistory);
interface CacheSwitchProps extends SwitchProps {
  match?: any;
  which?: any;
}

class CacheSwitch extends Switch {
  constructor(props) {
    super(props);
  }
  getContext = () => {
    const { location, match } = this.props;
    return { location, match };
  };
  render() {
    const { children, which } = this.props;
    const { location, match: contextMatch } = this.getContext();

    let __matchedAlready = false;
    return (
      <>
        {React.Children.map(children, (element) => {
          if (!React.isValidElement(element)) {
            return null;
          }

          const path = element.props.path || element.props.from;
          const match = __matchedAlready
            ? null
            : path
            ? matchPath(
                location.pathname,
                {
                  ...element.props,
                  path
                },
                contextMatch
              )
            : contextMatch;

          let child;

          if (which(element)) {
            child = React.cloneElement(element, {
              location,
              computedMatch: match,
              /**
               * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js#L57
               *
               * Note:
               * Route would use computedMatch as its next match state ONLY when computedMatch is a true value
               * So here we have to do some trick to let the unmatch result pass Route's computedMatch check
               *
               * 注意：只有当 computedMatch 为真值时，Route 才会使用 computedMatch 作为其下一个匹配状态
               * 所以这里我们必须做一些手脚，让 unmatch 结果通过 Route 的 computedMatch 检查
               */
              ...(isNull(match)
                ? {
                    computedMatchForCacheRoute: {
                      __isComputedUnmatch: true
                    }
                  }
                : null),
              context: this.props
            });
          } else {
            child =
              match && !__matchedAlready
                ? React.cloneElement(element, {
                    location,
                    computedMatch: match,
                    context: this.props
                  })
                : null;
          }

          if (!__matchedAlready) {
            __matchedAlready = !!match;
          }

          return child;
        })}
      </>
    );
  }
}
export default CacheSwitch;
