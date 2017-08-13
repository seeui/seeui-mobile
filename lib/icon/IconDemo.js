/**
 * @file Icon demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-05
 */

import {h, Component} from 'preact';
import {Icon} from '../index';


class IconWrap extends Component {
    render() {
        return (
            <div className="icon-wrap">{this.props.children}</div>
        );
    }
}

export default class ButtonDemo extends Component {
    render() {
        return (
            <div className="icons-wrap">
                <IconWrap><Icon type="check" /></IconWrap>
                <IconWrap><Icon type="close" /></IconWrap>
                <IconWrap><Icon type="favor-fill" /></IconWrap>
                <IconWrap><Icon type="favor" /></IconWrap>
                <IconWrap><Icon type="loading" /></IconWrap>
                <IconWrap><Icon type="round-check-fill" /></IconWrap>
                <IconWrap><Icon type="round-check" /></IconWrap>
                <IconWrap><Icon type="round-close-fill" /></IconWrap>
                <IconWrap><Icon type="round-close" /></IconWrap>
                <IconWrap><Icon type="search" /></IconWrap>
                <IconWrap><Icon type="unfold" /></IconWrap>
                <IconWrap><Icon type="back" /></IconWrap>
                <IconWrap><Icon type="more" /></IconWrap>
                <IconWrap><Icon type="question-fill" /></IconWrap>
                <IconWrap><Icon type="top" /></IconWrap>
                <IconWrap><Icon type="right" /></IconWrap>
                <IconWrap><Icon type="refresh" /></IconWrap>
                <IconWrap><Icon type="delete-fill" /></IconWrap>
                <IconWrap><Icon type="delete" /></IconWrap>
                <IconWrap><Icon type="home" /></IconWrap>
                <IconWrap><Icon type="home-fill" /></IconWrap>
                <IconWrap><Icon type="square-check-fill" /></IconWrap>
                <IconWrap><Icon type="square" /></IconWrap>
                <IconWrap><Icon type="square-check" /></IconWrap>
                <IconWrap><Icon type="round" /></IconWrap>
                <IconWrap><Icon type="fold" /></IconWrap>
                <IconWrap><Icon type="info-fill" /></IconWrap>
                <IconWrap><Icon type="info" /></IconWrap>
                <IconWrap><Icon type="share" /></IconWrap>
                <IconWrap><Icon type="people-fill" /></IconWrap>
                <IconWrap><Icon type="people" /></IconWrap>
                <IconWrap><Icon type="radio-box" /></IconWrap>
                <IconWrap><Icon type="radio-box-fill" /></IconWrap>
                <IconWrap><Icon type="add" /></IconWrap>
                <IconWrap><Icon type="move" /></IconWrap>
                <IconWrap><Icon type="warn-fill" /></IconWrap>
                <IconWrap><Icon type="warn" /></IconWrap>
            </div>
        );
    }
}

//# sourceMappingURL=IconDemo.js.map
