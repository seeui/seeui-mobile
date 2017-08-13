/**
 * @file Sticky demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-24
 */

import {h, Component} from 'preact';
import Sticky from './Sticky';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';

import './StickyDemo.styl';

export default class StickyDemo extends Component {

    render() {
        return (
            <div className="sticky-demo">
                {
                    // 如果想要更好的效果，可以判断如果是iOS平台，采用position: sticky
                    // 否则 iOS@10.3.1 以下的版本可能会不流畅
                    // 不过 sticky 只会在父元素的范围内，所以最好父元素高度与 body 一致
                }
                <Sticky>
                    <Tabs
                        widthType="all"
                        selectedIndex={this.state.index}
                        onChange={tab => {
                            this.setState({
                                index: tab.selectedIndex
                            });
                        }}
                    >
                        <Tab>评价</Tab>
                        <Tab>投诉</Tab>
                        <Tab>新闻</Tab>
                    </Tabs>
                </Sticky>
            </div>
        );
    }
}
