/**
 * @file Carousel
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-17
 */

import {h, Component} from 'preact';
import Gesture from '../util/Gesture';
import classNames from 'classnames';
import transform from '../util/transform';
import CarouselDot from './CarouselDot';

import {setStyle, query, queryAll, addClass, removeClass} from '../util/dom';


export default class Carousel extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        // 卡片百分比宽度
        cardPercentWidth: 75,
        // 卡片之间的间距
        gap: 5,
        index: 0,
        scale: 90
    }

    constructor(props) {
        super(props);
        this.arrLength = props.children.length;
        this.state = {
            current: props.index
        };
        this.list = null;
        // this.focused = null;
    }

    componentDidMount() {
        const {isCard, cardPercentWidth, gap, index, scale}  = this.props;

        // 子元素数量
        this.arrLength = this.props.children.length;

        transform(this.list);

        if (isCard) {

            // 增加宽度和间距
            for (let item of this.getAllItems()) {
                setStyle(item, 'padding', `0 ${gap / 2}px`);
                setStyle(item, 'width', `${cardPercentWidth}%`);
            }

            // 居中卡片
            let paddingLeft = (this.list.clientWidth -  this.getItemWidth()) / 2;
            setStyle(this.content, 'marginLeft', paddingLeft + 'px');

            // 先将所有卡片缩放到指定大小
            this.getAllItems().map(item => {
                setStyle(item, 'transform', `scale(${scale / 100})`);
            });
        }

        this.changeIndex(index, false);
    }

    endAnimation() {
        // press move 的时候延迟尽量小一点
        // 但是也不能完全没有，不然释放的一瞬间，手机上会顿挫
        // TODO 不算特别好的解决方法，需要优化
        setStyle(this.list, 'transition', '.1s linear');
    }

    onPressMove(evt) {
        const current = this.state.current;

        this.endAnimation();

        if ((current === 0 && evt.deltaX > 0) || (current === this.arrLength - 1 && evt.deltaX < 0)) {
            this.list.translateX += evt.deltaX / 3;
        }
        else {
            this.list.translateX += evt.deltaX;
        }

        // 如果用户在这个区域上下滚动，则还是需要上下滚动的
        // 但是uc浏览器在左右滚动时会前进回退页面，所以现在暂时preventDefault
        // TODO 不算特别好的解决方法，需要优化
        // if (Math.abs(evt.deltaY / 2) - Math.abs(evt.deltaX) <= 0) {
        //     evt.preventDefault();
        // }
        evt.preventDefault();
    }

    onSwipe(evt) {
        const direction = evt.direction;
        let current = this.state.current;

        switch (direction) {
            case 'Left':
                current < this.arrLength - 1 && ++current;
                break;
            case 'Right':
                current > 0 && current--;
                break;
        }
        this.changeIndex(current);
    }

    getAllItems() {
        const prefixCls = this.props.prefixCls;
        return queryAll(`.${prefixCls}-carousel-item`, this.list);
    }

    getItemWidth() {
        const prefixCls = this.props.prefixCls;
        // 优先找item元素宽度，因为有可能是卡片列表，卡片宽度小于列表宽度
        let dom = query(`.${prefixCls}-carousel-item`, this.list);
        return dom.clientWidth;
    }

    changeIndex(current, ease = true) {
        const {children, scale, isCard, prefixCls} = this.props;
        ease && setStyle(this.list, 'transition', '.3s ease');
        this.list.translateX = -current * this.getItemWidth();

        // 缩小其余卡片的大小，恢复当前卡片大小
        if (isCard) {
            let carouselItems = this.getAllItems();

            carouselItems.map(item => {
                removeClass(item, `${prefixCls}-carousel-item-current`);
                ease && setStyle(item, 'transition', '.3s ease-in-out');
                setStyle(item, 'transform', `scale(${scale / 100})`);

            });
            addClass(carouselItems[current], `${prefixCls}-carousel-item-current`);
            setStyle(carouselItems[current], 'transform', 'scale(1)');
        }

        this.setState({current});
        this.props.changeIndex && this.props.changeIndex(current);
    }

    render() {
        const {prefixCls, className, children, disableDot, isCard, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-carousel`]: true,
            'is-card': isCard,
            [className]: className
        });

        return (
            <Gesture
                onSwipe={this.onSwipe.bind(this)}
                onPressMove={this.onPressMove.bind(this)}
            >
                <div className={cls}>
                    <div
                        className={`${prefixCls}-carousel-content`}
                        ref={dom => this.content = dom}
                    >
                        <div ref={dom => this.list = dom} className="cui-carousel-list">
                            {children}
                        </div>
                    </div>
                    {disableDot ? '' : (
                        <CarouselDot current={this.state.current} all={this.arrLength} />
                    )}
                </div>
            </Gesture>
        );
    }
}

//# sourceMappingURL=Carousel.js.map
