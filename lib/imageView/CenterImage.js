/**
 * @file CenterImage
 * https://github.com/Caesor/react-imageview
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-09
 */

import {h, Component} from 'preact';
import Icon from '../icon/Icon';
import {setStyle} from '../util/dom';


/**
 * 预加载数量
 *
 * @const
 * @type {number}
 */
const PRELOAD_NUM = 3;

export default class CenterImage extends Component {

    static defaultProps = {
        prefixCls: 'cui'
    };

    state = {
        loading: true,
        error: false,
        loaded: false
    }

    componentWillMount() {
        this.loadImg();
    }

    componentWillReceiveProps() {
        !this.state.loaded && this.loadImg();
    }

    loadImg() {
        const {index, current, lazysrc} = this.props;

        if (lazysrc && index <= current + PRELOAD_NUM && index >= current - PRELOAD_NUM) {
            let img = new Image();

            img.src = lazysrc;
            img.onload = () => {
                this.setState({
                    loading: false
                });
            };
            img.onerror = () => {
                this.setState({
                    loading: false,
                    error: true
                });
            };
        }
    }

    onImgLoad(e) {

        this.setState({loaded: true});

        const target = e.target;
        const {naturalHeight: h, naturalWidth: w} = target;
        const r = h / w;
        const height = window.innerHeight || window.screen.availHeight;
        const width = window.innerWidth || window.screen.availWidth;
        const rate = height / width;

        let imgStyle = {};

        if (r >= 3.5) {
            target.setAttribute('long', true);
        }
        if (r > rate) {
            imgStyle.height = height + 'px';
            imgStyle.width = w * height / h + 'px';
            imgStyle.left = width / 2 - (w * height / h) / 2 + 'px';
            imgStyle.top = 0;
        }
        else if (r < rate) {
            imgStyle.width = width + 'px';
            imgStyle.height = h * width / w + 'px';
            imgStyle.left = 0;
            imgStyle.top = height / 2 - (h * width / w) / 2 + 'px';
        }
        else {
            imgStyle.width = width;
            imgStyle.height = height;
        }

        setStyle(target, 'width', imgStyle.width);
        setStyle(target, 'height', imgStyle.height);
        imgStyle.left && setStyle(target, 'left', imgStyle.left);
        imgStyle.top && setStyle(target, 'top', imgStyle.top);

        target.setAttribute('rate', 1 / r);
    }

    render() {
        const {prefixCls, index, current, lazysrc, ...childProps} = this.props;
        const {loading, error} = this.state;

        const img = (
            <img onLoad={this.onImgLoad.bind(this)} src={lazysrc} {...childProps} />
        );
        // init first image, others have been preloaded
        if (index === current) {
            return img;
        }
        if (loading) {
            return (
                <div className={`${prefixCls}-centerimage-loading`}>
                    <div className={`${prefixCls}-centerimage-loading-icon`}>
                        <Icon type="loading" />
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div className={`${prefixCls}-centerimage-error`}>
                    <div className={`${prefixCls}-centerimage-error-icon`}>加载失败</div>
                </div>
            );
        }

        return img;
    }
}

//# sourceMappingURL=CenterImage.js.map
