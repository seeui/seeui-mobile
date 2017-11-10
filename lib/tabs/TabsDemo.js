/**
 * @file Button demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-05
 */

import {h, Component} from 'preact';
import {Tabs, Tab} from '../index';


export default class TabsDemo extends Component {

    render() {
        return (
            <div className="tabs-demo">
                <h3>默认</h3>
                <Tabs
                    selectedIndex={this.state.index1}
                    onChange={tab => {
                        this.setState({
                            index1: tab.selectedIndex
                        });
                    }}
                >
                    <Tab>评价</Tab>
                    <Tab>投诉</Tab>
                    <Tab>新闻</Tab>
                </Tabs>
                <Tabs
                    type="txtline"
                    selectedIndex={this.state.index2}
                    onChange={tab => {
                        this.setState({
                            index2: tab.selectedIndex
                        });
                    }}
                >
                    <Tab>评价</Tab>
                    <Tab>投诉</Tab>
                    <Tab>新闻</Tab>
                </Tabs>
                <br />
                <h3>很长很长的Tab</h3>
                <Tabs
                    selectedIndex={this.state.index3}
                    onChange={tab => {
                        this.setState({
                            index3: tab.selectedIndex
                        });
                    }}
                >
                    <Tab>网民评价<em>(12)</em></Tab>
                    <Tab>消费曝光<em>(12222)</em></Tab>
                    <Tab>热点新闻<em>(121111)</em></Tab>
                </Tabs>
                <br />
                <h3>等分全屏的tab</h3>
                <Tabs
                    selectedIndex={this.state.index4}
                    onChange={tab => {
                        this.setState({
                            index4: tab.selectedIndex
                        });
                    }}
                    widthType="all"
                    type="txtline"
                >
                    <Tab href="//koubei.baidu.com">链接1</Tab>
                    <Tab href="//koubei.baidu.com">链接2</Tab>
                    <Tab href="//koubei.baidu.com">链接3</Tab>
                </Tabs>
                <Tabs
                    selectedIndex={this.state.index5}
                    onChange={tab => {
                        this.setState({
                            index5: tab.selectedIndex
                        });
                    }}
                    widthType="all"
                >
                    <Tab href="//koubei.baidu.com">链接1</Tab>
                    <Tab href="//koubei.baidu.com">链接2</Tab>
                    <Tab href="//koubei.baidu.com">链接3</Tab>
                </Tabs>
            </div>
        );
    }
}

//# sourceMappingURL=TabsDemo.js.map
