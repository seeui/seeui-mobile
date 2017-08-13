/**
 * @file Dialog demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-05
 */

/* eslint-disable no-console */
import {h, Component} from 'preact';
import {Button, Dialog, SingleDialog, SingleAlert, SingleConfirm} from '../index';
import {lockWindow, unLockWindow} from '../util/windowScrollHelper';

function toggleLockWindow(lock) {
    // wrapper是body的第一个子容器，不传默认会查找body里第一个子节点
    // let wrapper = document.getElementById('app');
    // lock ? lockWindow(wrapper) : unLockWindow(wrapper);
    lock ? lockWindow() : unLockWindow();
}

export default class ButtonDemo extends Component {

    render() {
        const showDialog = this.state.showDialog;

        const CustomDialogDemo = (
            <Button
                onClick={() => {
                    SingleDialog.show({
                        show: true,
                        width: '200px',
                        children: '我是自定义浮层',
                        buttons: [{
                            type: 'primary',
                            value: '确定',
                            onClick() {
                                console.log('Custom Dialog 确定');
                                SingleDialog.hide();
                            }
                        }, {
                            type: 'default',
                            value: '取消',
                            onClick() {
                                console.log('Custom Dialog 取消');
                                SingleDialog.hide();
                            }
                        }],
                        onHide() {
                            SingleDialog.hide();
                        }
                    });
                }}
            >
                显示自定义浮层
            </Button>
        );

        const AlertDemo = (
            <Button
                onClick={() => {
                    SingleAlert.show({
                        width: '200px',
                        children: '我是 Alert 浮层',
                        onSubmit() {
                            console.log('Alert 确定');
                            SingleAlert.hide();
                        },
                        onHide() {
                            SingleAlert.hide();
                        }
                    });
                }}
            >
                显示 Alert 浮层
            </Button>
        );

        const ConfirmDemo = (
            <Button
                onClick={() => {
                    SingleConfirm.show({
                        width: '200px',
                        children: '我是Confirm浮层',
                        onSubmit() {
                            console.log('Confirm 确定');
                            SingleConfirm.hide();
                        },
                        onCancel() {
                            console.log('Confirm 取消');
                            SingleConfirm.hide();
                        },
                        onHide() {
                            SingleConfirm.hide();
                        }
                    });
                }}
            >
                显示 Confirm 浮层
            </Button>
        );

        const CustomDialogDemo2 = (
            <div>
                <Button
                    type="default"
                    onClick={() => {
                        this.setState({showDialog: true});
                    }}
                >
                    显示自定义浮层(另一种调用方式)
                </Button>
                <Dialog
                    show={showDialog}
                    width="200px"
                    top="10px"
                    hasClose={true}
                    maskClickClose={true}
                    onHide={() => {
                        this.setState({showDialog: false});
                    }}
                    buttons={[{
                        type: 'primary',
                        value: '确定',
                        onClick: () => {
                            console.log('确定');
                            this.setState({showDialog: false});
                        }
                    }, {
                        type: 'default',
                        value: '取消',
                        onClick: () => {
                            console.log('取消');
                            this.setState({showDialog: false});
                        }
                    }]}
                >
                    我是自定义浮层
                </Dialog>
            </div>
        );

        const lockWindowDialogDemo = (
            <Button
                onClick={() => {
                    SingleDialog.show({
                        show: true,
                        width: '200px',
                        children: '我是锁屏浮层',
                        buttons: [{
                            type: 'primary',
                            value: '确定',
                            onClick() {
                                console.log('Custom Dialog 确定');
                                SingleDialog.hide();
                            }
                        }, {
                            type: 'default',
                            value: '取消',
                            onClick() {
                                console.log('Custom Dialog 取消');
                                SingleDialog.hide();
                            }
                        }],
                        onHide() {
                            SingleDialog.hide();
                            toggleLockWindow(false);
                        },
                        onShow() {
                            toggleLockWindow(true);
                        },
                        onDestroy() {
                            toggleLockWindow(false);
                        }
                    });
                }}
            >
                显示锁屏浮层
            </Button>
        );

        return (
            <div>
                <p>{CustomDialogDemo}</p>
                <p>{AlertDemo}</p>
                <p>{ConfirmDemo}</p>
                <p>{lockWindowDialogDemo}</p>
                <p>{CustomDialogDemo2}</p>
            </div>
        );
    }
}
