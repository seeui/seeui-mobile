/**
 * @file SearchBoxDemo
 * @author wuqi57(441984145@qq.com)
 * @time 17/7/25
 */

import {h, Component} from 'preact';

import SearchBox from './SearchBox';

import fetchJsonp from 'fetch-jsonp';

import './SearchBoxDemo.styl';

export default class SearchBoxDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            sugList: []
        };
    }

    /**
     * 渲染sug内容
     *
     * @private
     * @return {Array}
     */
    renderSugContent(resolve) {
        const suggestionList = this.state.sugList;
        let sugContent = [];

        suggestionList.map(item => {
            sugContent.push(
                <div className="suggestion-item" onClick={() => resolve(item)}>
                    {item}
                </div>
            );
        });

        return sugContent;
    }


    /**
     * 获取sug数据
     *
     * @private
     * @param {string} value 搜索query
     */
    getSugList(value) {
        fetchJsonp(`http://m.baidu.com/su?wd=${value.trim()}&ie=utf-8&json=1`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    sugList: json.s || []
                });
            });
    }

    render() {
        return (
            <div className="searchbox-demo">
                <SearchBox
                    value={this.state.value}
                    onGetSug={this.getSugList.bind(this)}
                    onRenderSugContent={this.renderSugContent.bind(this)}
                />
            </div>
        );
    }
}
