/**
 * @file Suggestion
 * @author wuqi57(441984145@qq.com)
 * @time 17/7/28
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import {lockWindow, unLockWindow} from '../util/windowScrollHelper';

import './Suggestion.styl';

export default class Suggestion extends Component {
    static defaultProps = {
        prefixCls: 'cui',
        isFullScreen: true
    };

    componentWillReceiveProps(nextProps) {
        this.isNeedLock = nextProps.show !== this.props.show;
    }

    /**
     * 初始化完成
     *
     * @override
     */
    componentDidMount() {
        const {show, isFullScreen} = this.props;
        isFullScreen && show && lockWindow();
    }

    /**
     * 更新完成
     *
     * @override
     */
    componentDidUpdate() {
        const {show, isFullScreen} = this.props;

        if (!isFullScreen || !this.isNeedLock) {
            return;
        }

        show ? lockWindow() : unLockWindow();
        this.isNeedLock = false;
    }

    /**
     * 销毁
     *
     * @override
     */
    componentWillUnmount() {
        const {show, isFullScreen} = this.props;

        if (!isFullScreen) {
            return;
        }

        show && unLockWindow();
    }

    render() {
        const {prefixCls, className, show, isFullScreen, children, ...others} = this.props;

        let cls = classNames({
            [`${prefixCls}-suggestion`]: true,
            'show': show,
            'full-screen': isFullScreen,
            [className]: className
        });

        return (
            <div {...others} className={cls}>
                {children}
            </div>
        );
    }
}
