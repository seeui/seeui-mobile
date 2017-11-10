/**
 * @file RateDemo
 * @author wuqi57(441984145@qq.com)
 * @time 17/7/13
 */

import {h, Component} from 'preact';
import Rate from './Rate';
import Icon from '../icon/Icon';

import './RateDemo.styl';

export default class RateDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate1: 0,
            rate2: 5,
            rate3: 2
        };
    }

    render() {
        const {rate1, rate2, rate3} = this.state;

        let rateContent = <Icon type="round-check-fill" />;

        return (
            <div className="rate-demo">
                <p>
                    默认评分：
                    <Rate
                        num={rate1}
                        onRateSelect={num => this.setState({rate1: num})}
                    />
                </p>
                <p>
                    可控评分个数：
                    <Rate
                        num={rate2}
                        count="8"
                        onRateSelect={num => this.setState({rate2: num})}
                    />
                </p>
                <p>
                    可控评分样式：
                    <Rate
                        num={rate3}
                        rateContent={rateContent}
                        onRateSelect={num => this.setState({rate3: num})}
                    />
                </p>
                <p>
                    禁用评分：
                    <Rate
                        num="2"
                        disabled
                        onRateSelect={num => this.setState({rate1: num})}
                    />
                </p>
            </div>
        );
    }
}
