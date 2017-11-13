/**
 * @file Button
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-10
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import {position, addClass, removeClass, setStyle} from '../util/dom';


/**
 * 按钮
 *
 * @class
 */
export default class Sticky extends Component {

    static defaultProps = {
        prefixCls: 'cui'
    };

    constructor(props) {
        super(props);

        this.state = {
            isSticky: false
        };

        // 是否为ios系统
        // this.isios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        this.watchStickyTimer = null;
    }

    componentDidMount() {
        this.watchSticky();

        // 外层容器设置高度，防止因为fixed页面坍塌产生了抖动
        let wrapHeight = this.stickyElem.clientHeight
            ? this.stickyElem.clientHeight  + 'px'
            : 'auto';
        setStyle(this.stickyWrap, 'height', wrapHeight);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.watchStickyTimer);
    }

    topChange() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let tempHeight = position(this.stickyWrap).top;

        if (scrollTop > tempHeight) {
            addClass(this.stickyElem, 'fixed');
        }
        else {
            removeClass(this.stickyElem, 'fixed');
        }
        this.watchStickyTimer = requestAnimationFrame(this.topChange.bind(this));
    }

    /**
     * 监听吸顶
     *
     * @private
     */
    watchSticky() {
        if (this.watchStickyTimer) {
            cancelAnimationFrame(this.watchStickyTimer);
        }

        this.watchStickyTimer = requestAnimationFrame(this.topChange.bind(this));
    }

    render() {
        const {prefixCls, children, className, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-sticky`]: true,
            [className]: className
        });

        return (
            <div className={cls} ref={dom => this.stickyWrap = dom}>
                <div ref={dom => this.stickyElem = dom}>
                    {children}
                </div>
            </div>
        );
    }
}

//# sourceMappingURL=Sticky.js.map
