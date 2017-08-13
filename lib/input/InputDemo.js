/**
 * @file Input demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-06
 */

import {h, Component} from 'preact';
import Input from './Input';

export default class InputDemo extends Component {

    handleKeyUp(e) {
        this.setState({
            value: e.target.value,
            afterValue: e.target.value + '@baidu.com'
        });
    }

    render() {
        return (
            <div>
                <p><Input value={this.state.value} onKeyUp={e => this.handleKeyUp(e)} placeholder="请输入邮箱前缀"/></p>
                <p><Input type="textarea" value={this.state.afterValue} disabled/></p>
            </div>
        );
    }
}

//# sourceMappingURL=InputDemo.js.map
