/**
 * @file: Checkbox.js
 * @author: afcfzf
 */

import {h, Component} from 'preact';
import {Button, Checkbox, CheckboxGroup, Icon} from '../index';

const optionsWithDisabled = [
    {label: <span><Icon type="favor-fill" />Apple</span>,
     value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: true}
];

export default class CheckboxDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            value: ['Orange', 'Pear'],
            all: false
        };
    }
    togChecked = () => {
        this.setState({
            checked: !this.state.checked
        });
    }
    togDisabled = () => {
        this.setState({
            disabled: !this.state.disabled
        });
    }
    setGroupValue = () => {
        this.state.all
            ? this.setState({value: [], all: false})
            : this.setState({value: ['Apple', 'Orange', 'Pear'], all: true});
    }
    groupOnChange = vals => {
        this.setState({
            value: vals,
            all: vals.length === optionsWithDisabled.length
        });
    }
    render(state, {checked, disabled, value, all}) {

        const space = {marginBottom: '10px'};
        return (
            <div style={space}>
                <h3>Checkbox:</h3>
                <div style={space}>
                    <Checkbox
                        disabled={disabled}
                        checked={checked}
                        onChange={result => {
                            this.setState({checked: result.checked});
                        }}
                        data-role="abcd"
                    >
                        选项1 - {!checked ? 'checked' : 'unchecked'} - {!disabled ? 'disabled' : 'undisabled'}
                    </Checkbox>
                </div>
                <div style={space}>
                    <Button size="small" onClick={this.togChecked}>
                        {!checked ? 'checked' : 'unchecked'}
                    </Button>
                    <span>&nbsp;</span>
                    <Button size="small" onClick={this.togDisabled}>
                        {!disabled ? 'disabled' : 'undisabled'}
                    </Button>
                </div>
                <div style={space}>check状态: {`${checked}`}</div>
                <h3>CheckboxGroup:</h3>
                <div style={space}>
                    <CheckboxGroup
                        className="test"
                        data-role="addd"
                        value={value}
                        options={optionsWithDisabled}
                        onChange={vals => this.groupOnChange(vals)}
                    />
                </div>
                <div style={space}>
                    <Button size="small" onClick={this.setGroupValue}>
                        {all ? '清空' : '全选'}
                    </Button>
                </div>
                <div style={space}>value值: {`${this.state.value}`}</div>
                <br />
            </div>
        );
    }
}
