/**
 * @file: CheckBox.js
 * @author: v_jialipeng
 */

import {h} from 'preact';
import classNames from 'classnames';
import Checkbox from './Checkbox';

export default ({
    options = [],
    value = [],
    className,
    prefixCls = 'cui',
    onChange = () => {},
    ...others
}) => {
    const cls = classNames({
        [`${prefixCls}-checkbox-group`]: true,
        [className]: className
    });
    const justify = v => value.indexOf(v) > -1;
    const itemChange = val => {
        const idx = value.indexOf(val.value);
        idx > -1 ? value.splice(idx, 1) : value.push(val.value);
        onChange(value);
    };

    return (
        <div className={cls}>
            {options.map(e => (typeof e === 'string' ? (
                <Checkbox checked={justify(e)} {...others} onChange={itemChange}>{e}</Checkbox>
            ) : (
                <Checkbox
                    checked={justify(e.value)}
                    {...others}
                    onChange={itemChange}
                    value={e.value}
                >
                    {e.label}
                </Checkbox>
            )))}
        </div>
    );
};
