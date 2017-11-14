/**
 * @file Toast demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-11-14
 */

import {h, Component} from 'preact';
import Button from '../button/Button';
import Toast, {SingleToast} from './Toast';

export default class TabsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false
        };
    }

    handleToastShow() {
        SingleToast.show({
            show: true,
            children: '我是提示',
            onHide() {
                SingleToast.hide();
            }
        });
    }

    render() {
        const showToast = this.state.showToast;
        return (
            <div className="toast-demo">
                <p>
                    <Button
                        onClick={() => {
                            this.setState({showToast: true});
                        }}
                    >
                        显示提示
                    </Button>
                </p>
                <p>
                    <Button
                        type="default"
                        onClick={() => this.handleToastShow()}
                    >
                        显示提示(单例调用方式)
                    </Button>
                </p>
                <Toast
                    show={showToast}
                    onHide={() => {
                        this.setState({showToast: false});
                    }}
                >
                    我是提示
                </Toast>
            </div>
        );
    }
}
