/**
 * @file Toast n秒后自动消失的提示
 * @author cgzero(cgzero@cgzero.com)
 * @time 2017-11-14
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import Singleton from '../util/Singleton';

import './Toast.styl';

let timer;

export default class Toast extends Component {
    static defaultProps = {
        prefixCls: 'cui',
        show: false,
        delay: 3000
    };

    componentDidMount() {
        this.setDelay();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setDelay();
        }
    }

    setDelay() {
        const {onHide, delay, onShow} = this.props;
        onShow && onShow();
        clearTimeout(timer);
        timer = setTimeout(() => {
            onHide && onHide();
        }, delay);
    }

    render() {
        const {prefixCls, show, className, children, ...others} = this.props;

        let cls = classNames({
            [`${prefixCls}-toast`]: true,
            [className]: className
        });

        return show ? (
            <div className={cls} {...others}>
                {children}
            </div>
        ) : null;

    }
}

export const SingleToast = new Singleton(Toast);
