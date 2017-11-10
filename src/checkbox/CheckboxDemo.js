/**
 * @file: Checkbox.js
 * @author: afcfzf
 */

import {h, Component} from 'preact';
import {Button, Checkbox, CheckboxGroup} from '../index';

/*eslint-disable*/
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'}
];
const optionsWithDisabled = [
    {label: 'Apple',
     value: 'Apple',
     content:
        <span className="test2" style={{paddingLeft: '5px', verticalAlign: 'middle'}}>
            <a href="http://www.baidu.com">查看详情</a>
        </span>
    },
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
    togChecked = _ => {
        this.setState({
            checked: !this.state.checked
        });
    }
    togDisabled = _ => {
        this.setState({
            disabled: !this.state.disabled
        });
    }
    setGroupValue = vals => {
        this.state.all ? this.setState({value: [], all:false}) : this.setState({value: ['Apple', 'Orange', 'Pear'], all: true});
    }
    groupOnChange = vals => {
        this.setState({
            value: vals,
            all: vals.length === optionsWithDisabled.length
        })
    }
    render(state, {checked, disabled, value, all}) {
        return (
            <p>
                <h4># Checkbox：</h4>
                <Checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={result => {
                        this.setState({checked: result.checked});
                    }}
                    data-role="abcd">
                    选项1 - {checked ? 'checked' : 'unchecked'} - {disabled ? 'disabled' : 'undisabled'}
                </Checkbox>
                <p>
                    <Button type="primary" size="small" onClick={this.togChecked}>
                        {checked ? 'checked' : 'unchecked'}
                    </Button>
                    <span>&nbsp;</span>
                    <Button type="primary" size="small" onClick={this.togDisabled}>
                        {disabled ? 'disabled' : 'undisabled'}
                    </Button>
                </p>
                <p>
                    -check状态: {`${checked}`}
                </p>
                <br/>
                <br/>
                <h4># CheckboxGroup：</h4>
                <p>
                    <CheckboxGroup
                    className = "test"
                    data-role = "addd"
                    value = {value}
                    options = {optionsWithDisabled}
                    onChange = {vals => this.groupOnChange(vals)}
                    />
                </p>
                <Button type="primary" size="small" onClick={ this.setGroupValue }>
                        {all ? '清空' : '全选'}
                </Button>
                <p>
                    -value值: {`${this.state.value}`}
                </p>
                <br/>
            </p>
        );
    }
}
