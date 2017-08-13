/**
 * @file InfiniteLoader demo
 * @author BabyLillian(719898036@qq.com)
 * @data 2017-07-04
 */

import {h, Component, render} from 'preact';
import {InfiniteLoader} from '../index';


export default class InfiniteLoaderDemo extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: [...Array(5).keys()]
        }
    }

    render() {
        return (
            <InfiniteLoader
                onLoadMore={(resolve, finish) => {

                    //mock request
                    setTimeout(()=> {
                        if (this.state.items.length > 10) {
                            // 不再请求
                            finish()
                        }
                        else {
                            this.setState({
                                items: this.state.items.concat(
                                    [
                                        this.state.items.length,
                                        (this.state.items.length + 1),
                                        (this.state.items.length + 2)
                                    ]
                                )
                            }, () => {
                                // 单词请求完成后执行
                                resolve()
                            });
                        }
                    }, 300)
                }}
            >
                <div className="infinite-demo">
                    <div>
                        {
                            this.state.items.map((item, i) => {
                                return (
                                    <div key={i} className="infinite-demo-item">
                                        <div className="infinite-demo-txt">{item}</div>
                                        <div className="infinite-demo-link">查看 ></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </InfiniteLoader>
        );
    }
}

//# sourceMappingURL=InfiniteLoaderDemo.js.map
