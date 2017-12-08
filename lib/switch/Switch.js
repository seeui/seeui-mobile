/**
 * @file: Switch
 * @author: afcfzf(9301462@qq.com)
 * @date: 2017-11-24
 */

import {h} from 'preact';
import classNames from 'classnames';

let startX = 0;
let offsetX = 0;
let moved = 0;
let positivePos = null;

export default ({
    checked = false,
    disabled = false,
    prefixCls = 'cui',
    onChange = () => {},
    name = null,
    children,
    className,
    value,
    ...others
}) => {
    positivePos = checked;
    let switchEle = null;
    const cls = classNames({
        [`${prefixCls}-switch`]: true,
        [className]: className,
        checked: checked,
        disabled: disabled
    });
    const clkHandler = (e, evt) => {
        if (disabled) {
            return false;
        }
        evt.preventDefault(); // 取消默认事件
        onChange(e.checked);
    };
    const touchHandler = evt => {
            const touchObj = evt.targetTouches[0];
            switch (evt.type) {
                case 'touchstart':
                    startX = touchObj.screenX;
                    moved = false;
                    break;
                case 'touchmove':
                    offsetX = touchObj.screenX - startX;
                    moved = true;
                    break;
                case 'touchend':
                    if (disabled) {
                        return false;
                    }
                    const direction = !!(offsetX > 0); // 方向为正数（右），则true
                    Math.abs(offsetX) >= switchEle.offsetWidth >> 2 && positivePos !== direction && moved
                    ? onChange(!checked)
                    : null;
                    positivePos = direction;
                    break;
                default:
                    break;
            }
        };

    return (
        <div className={cls} {...others}>
            <label
                className={`${prefixCls}-switch-wrap`}
                onClick={evt => clkHandler({checked: !checked, value}, evt)}
                onTouchStart={evt => touchHandler(evt)}
                onTouchMove={evt => touchHandler(evt)}
                onTouchEnd={evt => touchHandler(evt)}
            >
                <span className={`${prefixCls}-switch-icon`} ref={ref => (switchEle = ref)} />
                <input
                    className={`${prefixCls}-switch-ipt`}
                    checked={checked}
                    disabled={disabled}
                    type="checkbox"
                    name={name}
                />
                <span className={`${prefixCls}-switch-text`}>{children}</span>
            </label>
        </div>
    );
};

//# sourceMappingURL=Switch.js.map
