/**
 * @file: SwitchDemo
 * @author: afcfzf(9301462@qq.com)
 * @date: 2017-11-18
 */

import {h, Component} from 'preact';
import {Button, Icon, Switch} from '../index';

export default class SwitchDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            disabled: false,
        };
    }
    changeHandler(checked) {
        this.setState({
            checked: checked
        });
    }
    reset() {
        this.setState({
            checked: false,
            disabled: false
        });
    }
    disableHandler() {
        this.setState({
            disabled: !this.state.disabled
        });
    }
    toggleGroup(val) {
        this.setState({
            value: val
        });
    }
    render(props, {checked, disabled, value}) {
        const space = {marginBottom: '10px'};
        return (
            <div>
                <h3>Switch</h3>
                <div style={space}>
                    <Switch
                        checked={checked}
                        disabled={disabled}
                        onChange={checked => this.changeHandler(checked)}
                    >
                    前面&nbsp;
                    <a href="//baidu.com" onClick={e => e.stopPropagation(e)} >查看协议</a>
                    &nbsp;后面
                    </Switch>
                </div>
                <p>选中状态: {checked ? 'true' : 'false'}</p>
                <div style={space}>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => this.disableHandler()}
                    >
                        {!disabled ? 'disabled' : 'unDisabled'}
                    </Button>
                    &nbsp;
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => this.reset()}
                    >
                    reset
                    </Button>
                </div>
            </div>
        );
    }
}

//# sourceMappingURL=SwitchDemo.js.map
