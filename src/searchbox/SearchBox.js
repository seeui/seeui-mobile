/**
 * @file SearchBox
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/6
 */

import {h, Component} from 'preact';
import classNames from 'classnames';

import Input from '../input/Input';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import Suggestion from './Suggestion';

import {addClass, removeClass, closest} from '../util/dom';

import './SearchBox.styl';

export default class SearchBox extends Component {
    static defaultProps = {
        prefixCls: 'cui',
        value: '',
        placeholder: '搜索',
        cancelBtnTxt: '取消',
        searchIcon: (<Icon type="search" size="14" className="cui-searchbox-icon-search" />),
        deleteIcon: (<Icon type="round-close-fill" size="14" className="cui-searchbox-icon-delete" />),
        hasSug: true
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            show: false
        };

        this.value = '';
    }

    /**
     * 取消按钮
     *
     * @private
     * @param {Event} e 事件对象
     */
    handleCancel(e) {
        const {prefixCls, onCancel} = this.props;

        let target = e.target;
        let parent = target && closest(target, `.${prefixCls}-searchbox`);

        parent && removeClass(parent, 'inputing');

        this.setState({value: this.value, show: false});

        onCancel && onCancel();
    }

    /**
     * 清空按钮点击
     *
     * @private
     */
    handleDelete() {
        const {hasSug, onGetSug, onInputChange} = this.props;

        !hasSug && onInputChange && onInputChange('');
        hasSug && this.state.show && onGetSug && onGetSug('');
    }

    /**
     * 输入框input事件
     *
     * @private
     * @param {Event} e 事件对象
     */
    handleChange(e) {
        const {hasSug, onGetSug, onInputChange} = this.props;
        let value = e.target.value;

        this.setState({value});

        !hasSug && onInputChange && onInputChange(value);
        hasSug && this.state.show && onGetSug && onGetSug(value);
    }

    /**
     * 输入框focus事件
     *
     * @private
     * @param {Event} e 事件对象
     */
    handleFocus(e) {
        const {prefixCls, hasSug, onInputFocus, onGetSug} = this.props;

        let target = e.target;
        let value = target.value;
        let parent = target && closest(target, `.${prefixCls}-searchbox`);

        parent && addClass(parent, 'inputing');
        onInputFocus && onInputFocus(value);

        this.setState({
            show: true
        });

        hasSug && value && onGetSug && onGetSug(value);
    }

    /**
     * 输入框软键盘按下事件
     *
     * @private
     * @param {Event} e 事件对象
     */
    handleKeyDown(e) {
        if (+e.keyCode === 13) {
            e.preventDefault();
            let value = e.target.value;
            this.setState({show: false});

            this.value = value;
            this.props.onSearchSubmit && this.props.onSearchSubmit(value);
        }
    }

    /**
     * sug点击事件
     *
     * @public
     * @param {string} value sug选择的query
     */
    sugClickHandle(value) {
        this.setState({
            value,
            show: false,
        });

        this.value = value;
    }

    render() {
        const {
            prefixCls,
            className,
            hasSug,
            placeholder,
            cancelBtnTxt,
            searchIcon,
            deleteIcon,
            onRenderSugContent,
            ...others
        } = this.props;

        const {show, value} = this.state;

        const cls = classNames({
            [`${prefixCls}-searchbox`]: true,
            'inputing': show,
            [className]: className
        });

        return (
            <div {...others} className={cls}>
                <form className={`${prefixCls}-searchbox-wrap`}>
                    <span className={`${prefixCls}-searchbox-i-search`}>
                        {searchIcon}
                    </span>
                    <Input
                        className={`${prefixCls}-searchbox-input`}
                        type="search"
                        value={value}
                        placeholder={placeholder}
                        onInput={this.handleChange.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        onKeyDown={this.handleKeyDown.bind(this)}
                    />
                    <span className={`${prefixCls}-searchbox-delete`} onClick={this.handleDelete.bind(this)}>
                        {deleteIcon}
                    </span>
                    <Button
                        type="default"
                        className={`${prefixCls}-searchbox-btn`}
                        onClick={this.handleCancel.bind(this)}
                    >
                        {cancelBtnTxt}
                    </Button>
                </form>
                {
                    hasSug && (<Suggestion show={show}>
                        {onRenderSugContent(this.sugClickHandle.bind(this))}
                        </Suggestion>)
                }
            </div>
        );
    }
}
