/**
 * @file ImageView
 * https://github.com/Caesor/react-imageview
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-09
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import CenterImage from './CenterImage';
import Gesture from '../util/Gesture';
import Singleton from '../util/Singleton';
import transform from '../util/transform';
import {setStyle} from '../util/dom';

import './ImageView.styl';

/**
 * 图片间的间距
 *
 * @const
 * @type {number}
 */
const MARGIN = 30;

export default class ImageView extends Component {
    static defaultProps = {
        prefixCls: 'cui',
        gap: MARGIN,
        current: 0,
        disablePageNum: false,
        desc: '',
        maxScale: 2
    }

    constructor(props) {
        super(props);
        this.arrLength = props.imagelist.length;
        this.state = {
            current: props.current
        };
        this.initScale = 1;
        this.screenWidth = window.innerWidth || window.screen.availWidth;
        this.screenHeight = window.innerHeight || window.screen.availHeight;
        this.list = null;
        this.ob = null;
        this.focused = null;
    }

    componentDidMount() {
        const current = this.state.current;
        const {imagelist, onInit} = this.props;

        this.arrLength = imagelist.length;

        transform(this.list);

        (current || current === 0) && this.changeIndex(current, false);
        this.bindStyle(current);

        onInit && onInit();
    }

    onSingleTap() {
        // 防止点击穿透，设置一点延迟
        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout(() => {
            this.props.onHide && this.props.onHide();
        }, 100);
    }

    onPressMove(evt) {
        const current = this.state.current;

        setStyle(this.list, 'transition', '.1s linear');

        if (!this.focused) {
            if ((current === 0 && evt.deltaX > 0) || (current === this.arrLength - 1 && evt.deltaX < 0)) {
                this.list.translateX += evt.deltaX / 3;
            }
            else {
                this.list.translateX += evt.deltaX;
            }
        }

        evt.preventDefault();
    }

    onSwipe(evt) {
        const direction = evt.direction;
        let current = this.state.current;

        if (this.focused) {
            return false;
        }
        switch (direction) {
            case 'Left':
                current < this.arrLength - 1 && ++current && this.bindStyle(current);
                break;
            case 'Right':
                current > 0 && current-- && this.bindStyle(current);
                break;
        }
        this.changeIndex(current);
    }

    onPicPressMove(evt) {
        const {deltaX, deltaY} = evt;
        const isLongPic = this.ob.getAttribute('long');
        const {scaleX, width} = this.ob;
        this.ob && this.ob.style && setStyle(this.ob, 'transition', '0s linear');

        if (this.ob.scaleX <= 1 || evt.touches.length > 1) {
            return;
        }

        if (this.ob && this.checkBoundary(deltaX, deltaY)) {
            !isLongPic && (this.ob.translateX += deltaX);
            this.ob.translateY += deltaY;

            if (isLongPic && scaleX * width === this.screenWidth) {
                this.focused = false;
            }
            else {
                this.focused = true;
            }
        }
        else {
            this.focused = false;
        }
        // console.log('translate ',this.ob.translateX, this.ob.translateY);
    }

    onLongTap() {
        this.props.onLongTap && this.props.onLongTap();
    }

    onDoubleTap(evt) {
        if (this.props.disableDoubleTap) {
            return false;
        }

        const origin = evt.origin;
        const originX = origin[0] - this.screenWidth / 2 - document.body.scrollLeft;
        const originY = origin[1] - this.screenHeight / 2 - document.body.scrollTop;
        const isLongPic = this.ob.getAttribute('long');

        if (this.ob.scaleX === 1) {
            !isLongPic && (this.ob.translateX = this.ob.originX = originX);
            !isLongPic && (this.ob.translateY = this.ob.originY = originY);
            this.setScale(isLongPic ? this.screenWidth / this.ob.width : this.props.maxScale);
        }
        else {
            this.ob.translateX = this.ob.originX;
            this.ob.translateY = this.ob.originY;
            this.setScale(1);
        }
    }

    bindStyle(current) {
        this.setState({current}, () => {
            this.ob && this.restore();
            this.ob = document.getElementById(`view${current}`);
            if (this.ob && !this.ob.scaleX) {
                transform(this.ob);
            }
        });
    }

    changeIndex(current, ease = true) {
        ease && (this.list.style.webkitTransition = '300ms ease');
        this.list.translateX = -current * (this.screenWidth + this.props.gap);

        this.props.onChangeIndex && this.props.onChangeIndex(current);
    }

    setScale(size) {
        this.ob.style.webkitTransition = '300ms ease-in-out';
        this.ob.scaleX = this.ob.scaleY = size;
    }

    restore(rotate = true) {
        this.ob.translateX = this.ob.translateY = 0;
        !!rotate && (this.ob.rotateZ = 0);
        this.ob.scaleX = this.ob.scaleY = 1;
        this.ob.originX = this.ob.originY = 0;
    }

    checkBoundary(deltaX = 0, deltaY = 0) {
        const {scaleX, translateX, translateY, originX, originY, width, height} = this.ob;
        const rate = this.ob.getAttribute('rate');

        if (scaleX !== 1 || scaleX !== rate) {
            // include long picture
            const rangeLeft = (scaleX - 1) * (width / 2 + originX) + originX;
            const rangeRight = -(scaleX - 1) * (width / 2 - originX) + originX;
            const rangeUp = (scaleX - 1) * (height / 2 + originY) + originY;
            const rangeDown = -(scaleX - 1) * (height / 2 - originY) + originY;

            if (translateX + deltaX <= rangeLeft
                && translateX + deltaX >= rangeRight
                && translateY + deltaY <= rangeUp
                && translateY + deltaY >= rangeDown
            ) {
                return true;
            }
        }
        return false;
    }

    handleDelete() {
        const onDelete = this.props.onDelete;
        onDelete && onDelete(this.state.current);
    }

    render() {
        const {
            prefixCls,
            imagelist,
            desc,
            disablePageNum,
            children,
            gap,
            className,
            showDeleteBtn,
            ...others
        } = this.props;
        const cls = classNames({
            [`${prefixCls}-imageview`]: true,
            [className]: className
        });

        return (
            <div className={cls}>
                <Gesture
                    onSingleTap={this.onSingleTap.bind(this)}
                    onPressMove={this.onPressMove.bind(this)}
                    onSwipe={this.onSwipe.bind(this)}>
                    <ul ref={dom => this.list = dom} className={`${prefixCls}-imageview-list`}>
                    {
                        imagelist.map((item, i) => (
                            <li
                                className={`${prefixCls}-imageview-item`}
                                style={{marginRight: gap + 'px'}}
                                key={'img' + i}
                            >
                                <Gesture
                                    onPressMove={this.onPicPressMove.bind(this)}
                                    onLongTap={this.onLongTap.bind(this)}
                                    onDoubleTap={this.onDoubleTap.bind(this)}>
                                    <CenterImage
                                        id={`view${i}`}
                                        className={`${prefixCls}-imageview-img`}
                                        lazysrc={item}
                                        index={i}
                                        current={this.state.current}
                                    />
                                </Gesture>
                            </li>
                        ))
                    }
                    </ul>
                </Gesture>
                {disablePageNum ? null : (
                    <div className={`${prefixCls}-imageview-pager`}>
                        {this.state.current + 1} / {this.arrLength}
                    </div>
                )}
                {showDeleteBtn ? (
                    <div
                        className={`${prefixCls}-imageview-delete`}
                        onClick={this.handleDelete.bind(this)}
                    >
                        <Icon type="delete-fill" />
                    </div>
                ) : null}
                {desc ? <div dangerouslySetInnerHTML={{__html: desc}}></div> : null}
                {children}
            </div>
        );
    }
}

export const SingleImageView = new Singleton(ImageView);
