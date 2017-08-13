/**
 * @file InfiniteLoader
 * @author BabyLillian(719898036@qq.com)
 * @data 2017-06-28
 */

import {h, Component} from 'preact';
import classNames from 'classnames';
import LoadMore from './LoadMore';


/**
 * 无限加载
 *
 * @class
 */
export default class InfiniteLoader extends Component {


    static defaultProps = {
        // 样式前缀
        prefixCls: 'cui',
        // 预加载高度范围
        minHeight: 500,
        // 最小的touch移动距离
        minDistance: 10,
        // element(icon) for default loader when there is no more content
        loaderDefaultIcon: <LoadMore showLine> 没有更多内容 </LoadMore>,
        // element(icon) for loading loader
        loaderLoadingIcon: <LoadMore loading> Loading... </LoadMore>,
        // element(icon) for more loader
        loaderMoreIcon: <LoadMore> 上拉加载更多 </LoadMore>,
        // callback when it's requesting for more content, pass resolve function and finish function
        onLoadMore() {},
        // 是否禁止滚动加载
        disabled: false
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            finish: false,
            // 首次进入页面
            initFlag: true
        };

        this.resolveLoading = this.resolveLoading.bind(this);
        this.finish = this.finish.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);

        this.scrollTimer = null;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    finish() {
        this.setState({
            loading: false,
            finish: true
        });
    }

    resolveLoading() {
        this.setState({
            loading: false,
            finish: false
        });
    }


    tryLoad() {
        if (this.props.disabled) {
            return;
        }

        let root = document.documentElement;

        // 兼容: Firefox浏览器下documentElement.scrollTop有效
        let scrollTop = document.body.scrollTop || root.scrollTop;

        if (this.state.loading || root.clientHeight + scrollTop + this.props.minHeight < root.scrollHeight) {
            return;
        }

        this.setState({
            loading: true
        });

        this.props.onLoadMore(this.resolveLoading, this.finish);
    }

    touchHandler(e) {
        let touch = e.touches ? e.touches[0] : e;

        this.setState({
            startY: touch.clientY || touch.pageY
        });
    }

    moveHandler(e) {
        let touch = e.touches ? e.touches[0] : e;
        let y = touch.clientY || touch.pageY;
        let dy = this.state.startY - y;

        // 忽略过小的移动
        if (dy >= this.props.minDistance) {
            this.tryLoad();
        }
    }

    scrollHandler() {
        if (this.props.disabled) {
            return;
        }

        // setup for scrollend event
        clearTimeout(this.scrollTimer);

        this.scrollTimer = setTimeout(() => {
            let root = document.documentElement;
            let scrollTop = root.scrollTop || document.body.scrollTop;
            let up = !!(scrollTop - this.state.scrollTop < 0);

            this.setState({scrollTop});

            // 向上滚动
            if (up) {
                return;
            }

            if (this.state.loading
                || root.clientHeight + scrollTop + this.props.minHeight < root.scrollHeight) {

                return;
            }

            // 页面刷新时，滚动条不在顶部
            // 对于这种场景，不抛load事件
            if (this.state.initFlag && scrollTop > 0) {
                this.setState({
                    loading: false,
                    initFlag: false
                });
                return;
            }

            this.setState({
                loading: true,
                initFlag: false
            });

            this.props.onLoadMore(this.resolveLoading, this.finish);
        }, 30)
    }

    render() {
        const {children, className, loaderLoadingIcon, loaderDefaultIcon, loaderMoreIcon, ...others} = this.props;

        const cls = classNames('cui-infiniteloader', className);

        let loaderStyle = {
            display: this.state.loading || this.state.finish ? 'block' : 'none'
        };

        return (
             <div
                className={cls}
                onTouchStart={e => this.touchHandler(e)}
                onTouchMove={e => this.moveHandler(e)}
                {...others}
            >
                {children}
                <div style={loaderStyle}>
                    {this.state.finish ? loaderDefaultIcon : this.state.loading ? loaderLoadingIcon : loaderMoreIcon}
                </div>
            </div>
        );
    }

}

//# sourceMappingURL=InfiniteLoader.js.map
