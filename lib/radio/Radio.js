/**
 * @file: Radio.js
 * @author: afcfzf(9301462@qq.com)
 * @date: 2017-11-18
 */

import {h} from 'preact';
import classNames from 'classnames';

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
    const cls = classNames({
        [`${prefixCls}-radio`]: true,
        [className]: className,
        checked: checked,
        disabled: disabled
    });
    const clkHandler = (e, evt) => {
        if (disabled) {
            return false;
        }
        evt.preventDefault(); // 取消默认事件
        e.checked !== checked ? onChange(e) : null;
    };

    return (
        <div className={cls} {...others}>
            <label
                className={`${prefixCls}-radio-wrap`}
                onClick={evt => clkHandler({checked: true, value}, evt)}
            >
                <span className={`${prefixCls}-radio-icon`} />
                <input
                    className={`${prefixCls}-radio-ipt`}
                    checked={checked}
                    disabled={disabled}
                    type="radio"
                    name={name}
                />
                <span className={`${prefixCls}-radio-text`}>{children}</span>
            </label>
        </div>
    );
};

//# sourceMappingURL=Radio.js.map
