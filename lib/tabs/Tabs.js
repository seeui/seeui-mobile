/**
 * @file Tabs
 * @author BabyLillian<719898036@qq.com>
 * @date 2017-07-09
 */

import {h, Component, cloneElement} from 'preact';
import classNames from 'classnames';
import {getStyle, setStyle, query, queryAll} from '../util/dom';
import Tab from './Tab';


export default class Tabs extends Component {

    constructor(props) {

        super(props);

        const selectedIndex = props.selectedIndex;

        /**
         * 状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            selectedIndex,
            hasAnimate: false
        };

        this.onTabClick = this.onTabClick.bind(this);

        this.doStickTimer = null;
        this.addAnimateTimer = null;
    }

    static defaultProps = {
        prefixCls: 'cui',
        selectedIndex: 0,
        // 类型，目前的值为 blockline 和 txtline， 默认为blockLine
        type: 'blockline',
        // 宽度，值为auto(自适应) 和 all（布满整个容器宽度，会被挤压）
        widthType: 'auto',
        // 滚动的步长
        scrollSize: -74,
        // 切换tab时底边是否有滑动动画
        hasAnimate: true,
        onChange() {}
    };

    static Tab = Tab;

    componentDidMount() {

        this.tabSum = queryAll(`.${this.props.prefixCls}-tabs-tab`, this.main).length;
        this.maxScrollX = this.main.clientWidth - this.nav.clientWidth;

        // 更新底边的状态
        this.doStick(false, true);
        // 前置检查是否需要滚动-首次渲染
        let selectedIndex = this.state.selectedIndex;
        if (this.props.widthType !== 'all' && selectedIndex > 0 && selectedIndex < this.tabSum) {
            let nextTab = Math.min(selectedIndex + 1, this.tabSum - 1);
            let tabs = queryAll(`.${this.props.prefixCls}-tabs-tab`, this.main);
            let navTab = tabs[nextTab];
            if (navTab && (navTab.offsetLeft + navTab.clientWidth > this.main.clientWidth)) {
                this.scrollToElement(tabs[selectedIndex]);
            }
        }
    }

    componentWillReceiveProps({selectedIndex}) {

        if (selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex
            });
        }
    }

    componentDidUpdate() {
        // 更新底边的状态,
        // 因为子组件Tab的渲染顺序在父组件之后，所以需要等待他们ready后再执行位置的更新
        this.doStickTimer = setTimeout(() => {
            // 全屏类型的不需要滚动
            this.doStick(this.props.widthType !== 'all');
        }, 0);
    }

    componentWillUnmount() {
        clearTimeout(this.doStickTimer);
        clearTimeout(this.addAnimateTimer);
    }

    scrollToElement(el) {
        if (!el) {
            return;
        }
        let posLeft = (-el.offsetLeft - this.props.scrollSize) || 0;
        posLeft = posLeft > 0 ? 0 : posLeft < this.maxScrollX ? this.maxScrollX : posLeft;

        setStyle(this.nav, 'WebkitTransform', `translateX(${posLeft}px)`);

    }

    doStick(ifScroll, isFirst) {
        const sel = `.${this.props.prefixCls}-tabs-tab-active`;
        let el = query(sel, this.main);
        this.stickBorder(el, isFirst);
        if (ifScroll && this.maxScrollX < 0) {
            this.scrollToElement(el);
        }
    }

    stickBorder(target, isFirst) {
        if (!target) {
            return;
        }

        let {clientWidth, offsetLeft} = target;

        if (this.props.type === 'txtline') {
            let el = query(`.${this.props.prefixCls}-tabs-tab-txt`, target);
            clientWidth = el.clientWidth;
            offsetLeft += (target.clientWidth - clientWidth) / 2 || 0;
        }

        setStyle(this.line, 'display', 'block');
        setStyle(this.line, 'width', clientWidth + 'px');
        setStyle(this.line, 'WebkitTransform', `translateX(${offsetLeft}px)`);

        // 在第一次渲染后才加上底边滑动动效类，不然一开始滑到相应tab下会不好看
        if (isFirst) {
            setTimeout(() => {
                this.addAnimateTimer = this.setState({
                    hasAnimate: this.props.hasAnimate
                });
            }, 0);
        }
    }

    onTabClick(e, index) {

        if (index === this.state.selectedIndex) {
            return;
        }

        let onChange = this.props.onChange;

        this.setState({selectedIndex: index}, () => {
            onChange && onChange({
                type: 'change',
                selectedIndex: index,
                target: this
            });
        });
    }


    render({prefixCls, className, children, type, widthType}) {

        let selectedIndex = this.state.selectedIndex;
        let percent = '';

        if (widthType === 'all' && children.length > 0) {
            percent = 1 / children.length * 100 + '%';
        }

        let tabs = children.map((tab, index) => {

            let selected = selectedIndex === index;

            return cloneElement(
                tab,
                {
                    key: index,
                    selected: selected,
                    index: index,
                    style: {width: percent},
                    onClick: this.onTabClick
                }
            );
        });

        const cls = classNames({
            [`${prefixCls}-tabs`]: true,
            [`${prefixCls}-tabs-blockline`]: type === 'blockline',
            [`${prefixCls}-tabs-txtline`]: type === 'txtline',
            [`${prefixCls}-tabs-width-all`]: widthType === 'all',
            [className]: className
        });

        const inkBarCls = classNames({
            [`${prefixCls}-tabs-ink-bar`]: true,
            [`${prefixCls}-tabs-ink-bar-animated`]: this.state.hasAnimate
        })

        return (
            <div className={cls} ref={node => this.main = node}>
                <div className={`${prefixCls}-tabs-bar`}>
                    <div className={`${prefixCls}-tabs-nav-container`}>
                        <div className={`${prefixCls}-tabs-nav-wrap`}>
                            <div className={`${prefixCls}-tabs-nav-scroll`}>
                                <div className={`${prefixCls}-tabs-nav`} ref={node => this.nav = node}>
                                    <div
                                        className={inkBarCls}
                                        ref={node => this.line = node}
                                    ></div>
                                    {tabs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
//# sourceMappingURL=Tabs.js.map
