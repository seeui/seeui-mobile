/**
 * @file Icons
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-04
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import './Icon.styl';

/**
 * 按钮
 *
 * @class
 */
export default class Icon extends Component {

    static defaultProps = {
        prefixCls: 'cui'
    };

    render() {
        const {prefixCls, type, style, className, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-i-${type}`]: true,
            [className]: className
        });

        return (
            <i
                style={style}
                className={cls}
                {...others}
            />
        );
    }
}
