/**
 * @file: CheckBox.js
 * @author: v_jialipeng
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import './Checkbox.styl';
/*eslint-disable*/
const Checkbox = ({checked, disabled, value, onChange = _ =>{}, prefixCls = 'cui', children, className, content, ...others}) => {
    const cls = classNames({
            [`${prefixCls}-checkbox-item`]: true,
            checked: checked,
            disabled: disabled,
            [className]: className
        });
    const clkHandler = (e, event) => {
        if (disabled) {return false};
        onChange(e);
        event.preventDefault();
        event.stopPropagation();
    }
    return (
        <div className = {cls}>
            <label className = {`${prefixCls}-checkbox-item-label`} onClick={ event => clkHandler({checked: !checked, value: value}, event) }>
                <span className={`${prefixCls}-checkbox-item-icon`}>
                    <input
                    className = {`${prefixCls}-checkbox-item-icon-ipt`}
                    type="checkbox"
                    checked = {checked}
                    {...others}
                    value = {checked}/>
                </span>
                <span className={`${prefixCls}-checkbox-item-text`}>{children}</span>
            </label>
            {content}
        </div>
    );
};

export default Checkbox;