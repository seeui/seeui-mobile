/**
 * @file Carousel
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-17
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

export default class CarouselDot extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        current: 0
    }

    render() {
        const {prefixCls, className, current, all, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-carousel-dots`]: true,
            [className]: className
        });

        let dots = [];
        for (let i = 0; i < all; i++) {
            const dotCls = classNames({
                [`${prefixCls}-carousel-dot`]: true,
                current: current === i
            });

            dots.push(
                <i className={dotCls}></i>
            );
        }

        return (
            <div className={cls}>{dots}</div>
        );
    }
}
