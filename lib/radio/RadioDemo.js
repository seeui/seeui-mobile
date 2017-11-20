/**
 * @file: RadioGroupDemo
 * @author: afcfzf(9301462@qq.com)
 * @date: 2017-11-18
 */

import {h, Component} from 'preact';
import {Button, Radio, Icon, RadioGroup} from '../index';

const optionsWithDisabled = [
    {label: <span><Icon type="people" />Apple</span>,
     value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: true},
    {label: '1', value: 1}
];

export default class RadioDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            disabled: false,
            value: 'Apple'
        };
    }
    changeHandler() {
        this.setState({
            checked: true
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
                <h3>Radio</h3>
                <div style={space}>
                    <Radio
                        checked={checked}
                        disabled={disabled}
                        onChange={value => this.changeHandler(value)}
                    >
                    前面&nbsp;
                    <a href="//baidu.com" onClick={e => e.stopPropagation(e)} >查看协议</a>
                    &nbsp;后面
                    </Radio>
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
                <h3>RadioGroup:</h3>
                <div style={space}>
                    <RadioGroup
                        name={'abc'}
                        options={optionsWithDisabled}
                        value={value}
                        onChange={val => this.toggleGroup(val)}
                    />
                </div>
                <p>value: {value}</p>
            </div>
        );
    }
}

//# sourceMappingURL=RadioDemo.js.map
