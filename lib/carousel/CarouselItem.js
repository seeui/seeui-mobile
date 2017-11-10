/**
 * @file Carousel Item
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-17
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

export default class CarouselItem extends Component {

    static defaultProps = {
        prefixCls: 'cui'
    }

    render() {
        const {prefixCls, className, children, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-carousel-item`]: true,
            [className]: className
        });

        return (
            <div className={cls} {...others}>{children}</div>
        );
    }
}

//# sourceMappingURL=CarouselItem.js.map
