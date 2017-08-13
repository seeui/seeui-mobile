/**
 * @file Dialog
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/29
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import Button from '../button/Button';
import {lockWindow, unLockWindow} from '../util/windowScrollHelper';
import {hasClass} from '../util/dom';

import './Dialog.styl';

export default class Dialog extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        show: false,
        close: true,
        maskClickClose: false,
        buttons: []
    };

    constructor(props) {
        super(props);

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            show: props.show
        };

        // 是否是回调通知导致父组件设置显示隐藏状态
        // true：不在触发onShow onHide回调   false：触发回调
        // 应用场景: 组件内部调用显示与隐藏，如关闭按钮，点击背景关闭等操作，操作成功触发的onHide要求父组件重置子组件显示隐藏状态
        //          此时会重新触发组件渲染，此时不再要求触发onShow onHide回调，静默处理显示隐藏状态
        this.propsUpdateEqual = false;

        // 是否是父组件通过props控制组件显示隐藏
        // 触发onShow onHide回调时是否通知父组件更新props中的显示隐藏状态
        // true: 是父组件设置状态，不再触发状态更新   false: 组件内部设置状态，需要触发状态更新
        // 应用场景：父组件设置显示隐藏，回调时不再要求重置父组件状态
        this.propsUpdateShow = false;
    }

    /**
     * 父级修改属性
     *
     * @private
     * @param {Object} nextProps 更改后的属性值
     */
    componentWillReceiveProps(nextProps) {
        let show = nextProps.show;

        if (show === this.state.show) {
            this.propsUpdateEqual = true;
            return;
        }

        this.propsUpdateEqual = false;
        this.propsUpdateShow = true;

        if (show) {
            this.setState({
                show: true
            });
            return;
        }

        this.hide();
    }

    /**
     * 隐藏浮层
     *
     * @public
     */
    hide() {
        if (this.state.show) {
            this.setState({show: false});
        }
    }

    toggleLockWindow(lock) {
        lock ? lockWindow() : unLockWindow();
    }

    onMaskClick(e) {
        const {prefixCls, maskClickClose} = this.props;
        if (maskClickClose && hasClass(e.target, `${prefixCls}-dialog`)) {
            this.hide();
        }
        else {
            e.stopPropagation();
        }
    }

    // 初始化完成，如果show，则触发onShow事件，初始化hide，不用触发onHide事件
    componentDidMount() {
        let onShow = this.props.onShow;
        let show = this.state.show;

        show && this.toggleLockWindow(true) && onShow && onShow();
    }

    // 状态更新后，可能是props改变，也可能是state改变触发的
    componentDidUpdate() {
        const {onShow, onHide} = this.props;
        const stateShow = this.state.show;

        // 防止内容关闭后，外部监控状态并更新props时重新触发事件
        if (this.propsUpdateEqual) {
            this.propsUpdateEqual = false;
            return;
        }

        if (stateShow) {
            this.toggleLockWindow(true);
            onShow && onShow(this.propsUpdateShow);
        }
        else {
            this.toggleLockWindow(false);
            onHide && onHide(this.propsUpdateShow);
        }

        this.propsUpdateShow = false;
    }

    // 销毁前如果状态是显示，则需要考虑解锁屏幕
    componentWillUnmount() {
        this.state.show && this.toggleLockWindow(false);
    }

    /**
     * 渲染浮层头部
     *
     * @private
     * @return {XML}
     */
    renderTitle() {
        const {prefixCls, title} = this.props;

        return (
            <h2 className={`${prefixCls}-dialog-header`}>{title}</h2>
        );
    }

    /**
     * 渲染关闭按钮
     *
     * @private
     * @return {XML}
     */
    renderClose() {
        const {prefixCls, closeContent} = this.props;

        return (
            <span
                onClick={this.hide.bind(this)}
                className={`${prefixCls}-dialog-close`}
            >
                {closeContent ? closeContent : '×'}
            </span>
        );
    }

    /**
     * 渲染底部button
     *
     * @private
     * @return {XML}
     */
    renderFooter() {
        const {prefixCls, buttons} = this.props;

        let btnsDom = buttons.map(button => {
            const {type = 'default', value, size = 'large', ...others} = button;

            return (
                <div className={`${prefixCls}-dialog-footer-item`}>
                    <Button type={type} size={size} {...others}>
                        {value}
                    </Button>
                </div>
            );
        });

        return (
            <div className={`${prefixCls}-dialog-footer`}>
                {btnsDom}
            </div>
        );
    }

    render() {
        const {
            prefixCls,
            className,
            width,
            top,
            children,
            close,
            title,
            buttons,
            maskClickClose,
            ...others
        } = this.props;

        const show = this.state.show;

        const dialogCls = classNames({
            [`${prefixCls}-dialog`]: true,
            'show': show,
            [className]: className
        });

        const dialogWrapCls = classNames({
            [`${prefixCls}-dialog-wrap`]: true,
            'vertical-middle': (top == null)
        });

        const dialogStyle = ''
            + (width ? `width:${width};` : '')
            + (top != null ? `top:${top}` : '');

        return (
            <div className={dialogCls} {...others} onClick={e => maskClickClose && this.onMaskClick(e)}>
                <div className={dialogWrapCls} style={dialogStyle}>
                    {title ? this.renderTitle() : null}
                    {close ? this.renderClose() : null}
                    <div className={`${prefixCls}-dialog-body`}>
                        {children}
                    </div>
                    {buttons && buttons.length ? this.renderFooter() : null}
                </div>
            </div>
        );
    }
}
