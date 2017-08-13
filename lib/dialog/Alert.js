/**
 * @file Alert
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/29
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import Singleton from '../util/Singleton';

import Dialog from './Dialog';


let defaultButton = {
    type: 'primary',
    value: '确定',
    size: 'large'
};

export default class Alert extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        hasClose: false,
        maskClickClose: false
    };

    constructor(props) {
        super(props);

        this.state.show = true;
    }

    onAlertHide(data) {
        if (data) {
            this.props.onHide && this.props.onHide(data);
        }

        this.setState({show: false});
    }

    render() {
        // show 和 onHide会重写，所以从others里提取出来
        const {prefixCls, className, button = {}, children, onSubmit, ...others} = this.props;

        const alertCls = classNames({
            [`${prefixCls}-dialog-alert`]: true,
            [className]: className
        });

        let dialogButtons = [{
            ...defaultButton,
            ...button,
            onClick: () => {
                let res = true;

                if (onSubmit) {
                    res = onSubmit();
                }

                // 如果返回false，会阻止页面关闭
                res !== false && this.setState({show: false});
            }
        }];

        return (
            <Dialog
                {...others}
                show={this.state.show}
                className={alertCls}
                buttons={dialogButtons}
                onHide={this.onAlertHide.bind(this)}
            >
                {children}
            </Dialog>
        );
    }
}

export const SingleAlert = new Singleton(Alert);

//# sourceMappingURL=Alert.js.map
