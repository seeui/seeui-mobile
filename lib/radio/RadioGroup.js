/**
 * @file: RadioGroup
 * @author: afcfzf(9301462@qq.com)
 * @date: 2017-11-19
 */
import {h} from 'preact';
import classNames from 'classnames';
import Radio from './Radio';

export default ({
    options = [],
    value = null,
    className,
    prefixCls = 'cui',
    onChange = () => {},
    ...others
}) => {
    const cls = classNames({
        [`${prefixCls}-radio-group`]: true,
        [className]: className
    });
    const itemChange = val => onChange(val);
    return (
        <div className={cls}>
            {options.map(e => (typeof e === 'string' ? (
                <Radio checked={value === e} value={e} {...others} onChange={val => itemChange(val)}>{e}</Radio>
            ) : (
                <Radio
                    checked={value === e.value}
                    {...others}
                    value={e.value}
                    disabled={e.disabled || others.disabled}
                    onChange={val => itemChange(val.value)}
                >
                    {e.label}
                </Radio>
            )))}
        </div>
    );
};

//# sourceMappingURL=RadioGroup.js.map
