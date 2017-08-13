/**
 * @file Button
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-05-25
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import './Button.styl';

/**
 * 按钮
 *
 * @class
 */
export default class Button extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        disabled: false,
        type: 'primary',
        size: 'large'
    };

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        const {prefixCls, type, size, disabled, children, className, ...others} = this.props;

        const showType = (type === 'primary' || type === 'default') ? type : 'primary'

        const cls = classNames({
            [`${prefixCls}-button`]: true,
            [showType]: showType,
            [size]: size,
            'disabled': disabled,
            [className]: className
        });

        return (
            <input
                className={cls}
                type="button"
                value={children}
                onClick={e => this.handleClick(e)}
                onTouchStart={() => {
                    // 绑定空函数，触发 Button 的 active
                }}
                disabled={disabled}
                {...others}
            />
        );
    }
}
