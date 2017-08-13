/**
 * @file Rate
 * @author cgzero(cgzero@cgzero.com)
 * @date 2017-07-04
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import Icon from '../icon/Icon';

import './Rate.styl';

export default class Rate extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        num: 0,
        count: 5,
        disabled: false
    };

    /**
     * 打分点击操作
     *
     * @private
     * @param {number} num 第几个rate
     */
    rateSelectHander(num) {
        const {disabled, onRateSelect} = this.props;

        if (disabled) {
            return;
        }

        onRateSelect && onRateSelect(num);
    }

    render() {
        const {prefixCls, className, num, count, size, rateContent, disabled, ...others} = this.props;

        const rateCls = classNames({
            [`${prefixCls}-rate`]: true,
            [className]: className
        });

        let starDom = [];

        for (let i = 0; i < +count; i++) {
            let cls = classNames({
                [`${prefixCls}-rate-item`]: true,
                'rate-active': i < +num
            });

            starDom.push(
                <span
                    className={cls}
                    onClick={() => disabled || this.rateSelectHander(i + 1)}
                >
                    {rateContent ? rateContent : <Icon type="favor-fill" size={size || '16'} />}
                </span>
            );
        }

        return (
            <div className={rateCls} {...others}>
                {starDom}
            </div>
        );
    }
}

