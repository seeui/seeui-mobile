/**
 * @file Confirm
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/30
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import Singleton from '../util/Singleton';

import Dialog from './Dialog';

import './Confirm.styl';

let defaultButtons = {
    submit: {
        role: 'submit',
        type: 'primary',
        value: '确定',
        size: 'large'
    },
    cancel: {
        role: 'cancel',
        type: 'default',
        value: '取消',
        size: 'large'
    }
};

export default class Confirm extends Component {
    static defaultProps = {
        prefixCls: 'cui',
        hasClose: false,
        maskClickClose: false
    };

    constructor(props) {
        super(props);

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state.show = true;
    }

    /**
     * 按钮关闭事件重新封装
     *
     * @private
     * @param {Object} button 按钮配置参数
     */
    clickHandler(button) {
        const {onSubmit, onCancel} = this.props;
        let res = true;

        if (button.role === 'submit' && onSubmit) {
            res = onSubmit();
        }
        else if (button.role === 'cancel' && onCancel) {
            res = onCancel();
        }

        res !== false && this.setState({show: false});
    }

    onConfirmHide(data) {
        if (data) {
            this.props.onHide && this.props.onHide(data);
        }

        this.setState({show: false});
    }

    render() {
        const {
            prefixCls,
            className,
            buttons = [],
            children,
            ...others
        } = this.props;

        const confirmCls = classNames({
            [`${prefixCls}-dialog-confirm`]: true,
            [className]: className
        });

        let dialogButtons = [];

        // 配置buttons，必须传role参数
        if (buttons.length) {
            dialogButtons = buttons.map(button => {
                let role = button.role;
                let defaultButton = defaultButtons[role];

                return {
                    ...defaultButton,
                    button,
                    onClick: () => this.clickHandler(button)
                };
            });
        }
        else {
            let {submit, cancel} = defaultButtons;

            dialogButtons = [
                {
                    ...submit,
                    onClick: () => this.clickHandler(submit)
                },
                {
                    ...cancel,
                    onClick: () => this.clickHandler(cancel)
                }
            ];
        }

        return (
            <Dialog
                {...others}
                show={this.state.show}
                className={confirmCls}
                buttons={dialogButtons}
                onHide={this.onConfirmHide.bind(this)}
            >
                {children}
            </Dialog>
        );
    }
}

export const SingleConfirm = new Singleton(Confirm);
