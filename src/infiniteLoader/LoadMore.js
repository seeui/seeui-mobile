/**
 * @file LoadMore
 * @author BabyLillian(719898036@qq.com)
 * @data 2017-06-28
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import './LoadMore.styl';

/**
 * 按钮
 *
 * @class
 */
export default class LoadMore extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        loading: false,
        showLine: false,
        showDot: false
    };

    render() {
        const {prefixCls, className, children, loading, showLine, showDot, ...others} = this. props;

        const cls = classNames({
            [`${prefixCls}-loadmore`]: true,
            [`${prefixCls}-loadmore-line`]: showLine,
            [`${prefixCls}-loadmore-dot`]: showDot,
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                {loading ? <Icon type="loading" /> : false}
                <span className={`${prefixCls}-tips`}>
                {children}
                </span>
            </div>
        );
    }
}


