/**
 * @file: CheckBox.js
 * @author: v_jialipeng
 */

import {h} from 'preact';
import classNames from 'classnames';


export default ({
    checked,
    disabled,
    value,
    onChange = () => {},
    prefixCls = 'cui',
    children,
    className,
    ...others
}) => {
    const cls = classNames({
        [`${prefixCls}-checkbox-item`]: true,
        checked: checked,
        disabled: disabled,
        [className]: className
    });

    const clkHandler = (e, evt) => {
        if (disabled) {
            return false;
        }
        onChange(e);
        // 取消默认事件，防止触发真实的checkbox
        evt.preventDefault();
    };

    return (
        <div className={cls}>
            <label
                className={`${prefixCls}-checkbox-item-label`}
                onClick={
                    evt => clkHandler({checked: !checked, value: value}, evt)
                }
            >
                <span className={`${prefixCls}-checkbox-item-icon`}>
                    <input
                        className={`${prefixCls}-checkbox-item-icon-ipt`}
                        type="checkbox"
                        checked={checked}
                        value={checked}
                        {...others}
                    />
                </span>
                <span className={`${prefixCls}-checkbox-item-text`}>{children}</span>
            </label>
        </div>
    );
};

//# sourceMappingURL=Checkbox.js.map
