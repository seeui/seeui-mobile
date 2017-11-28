/**
 * @file Input
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-06
 */

import {h, Component} from 'preact';
import {findDOMNode} from 'preact-compat';
import classNames from 'classnames';
import Icon from '../icon/Icon';

import './Uploader.styl';

export default class Uploader extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        title: '图片上传',
        maxCount: 9,
        maxSize: 5 * 1024 * 1024,
        minSize: 0,
        maxWidth: 500,
        files: [],
        onChange: undefined,
        onError: undefined,
        lang: {
            maxError(maxCount) {
                return `最多只能上传${maxCount}张图片`;
            },
            typeError: '上传文件的格式必须为图片',
            sizeError(min, max) {
                if (min && max) {
                    return `图片大小需大于${min}，小于${max}`;
                }
                if (min) {
                    return `图片大小需不能低于${min}`;
                }
                if (max) {
                    return `图片大小需不能超过${max}`;
                }
                return '图片大小有误';
            }
        }
    };

    constructor(props) {
        super(props);
        this.lang = {
            ...Uploader.defaultProps.lang,
            ...this.props.lang
        };
    }

    sizeConvert(size) {
        if (!size) {
            return null;
        }

        if (size < 1024) {
            return size + 'B';
        }
        else if (size < 1024 * 1024) {
            return parseInt(size / 1024, 10) + 'KB';
        }

        return parseInt(size / 1024 / 1024, 10) + 'MB';
    }

    handleFile(file, cb) {
        const {onError, maxSize, minSize, onStart} = this.props;

        onStart && onStart(file);

        // 格式校验
        if (!/image/.test(file.type)) {
            onError(this.lang.typeError);
            return;
        }

        // 大小校验
        if (maxSize && file.size > maxSize || minSize && file.size < minSize) {
            onError(this.lang.sizeError(
                this.sizeConvert(minSize),
                this.sizeConvert(maxSize)
            ));
            return;
        }

        let reader = new FileReader();

        reader.onload = e => {
            let img = new Image();

            img.onload = () => {
                let w = Math.min(this.props.maxWidth, img.width);
                let h = img.height * (w / img.width);
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                // patch subsampling bug
                // http://jsfiddle.net/gWY2a/24/
                let drawImage = ctx.drawImage;
                /* eslint-disable */
                ctx.drawImage = (drawImg, sx, sy, sw, sh, dx, dy, dw, dh) => {
                /* eslint-enable */
                    // Execute several cases (Firefox does not handle undefined as no param)
                    // by call (apply is bad performance)
                    if (arguments.length === 9) {
                        drawImage.call(ctx, drawImg, sx, sy, sw, sh, dx, dy, dw, dh);
                    }
                    else if (typeof sw !== 'undefined') {
                        drawImage.call(ctx, drawImg, sx, sy, sw, sh);
                    }
                    else {
                        drawImage.call(ctx, drawImg, sx, sy);
                    }
                };

                canvas.width = w;
                canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);

                let base64 = canvas.toDataURL('image/png');

                cb({
                    nativeFile: file,
                    lastModified: file.lastModified,
                    lastModifiedDate: file.lastModifiedDate,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: base64
                }, e);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    renderFiles() {
        const {files, prefixCls, onFileClick} = this.props;
        let currFiles = files || [];

        return currFiles.map((file, idx) => {
            let {url, error, status, onClick, loading, ...others} = file;
            let fileStyle = {
                backgroundImage: `url(${url})`
            };
            let cls = classNames({
                [`${prefixCls}-uploader-file`]: true,
                [`${prefixCls}-uploader-file-status`]: error || status || loading
            });

            let handleFileClick = onClick ? onClick : e => {
                onFileClick && onFileClick(e, file, idx);
            };

            let content;
            if (error) {
                content = <Icon type="warn-fill" />;
            }
            else if (loading) {
                content = <Icon type="loading" />;
            }
            else if (status) {
                content = status;
            }

            return (
                /* eslint-disable */
                <li className={cls} key={idx} style={fileStyle} onClick={handleFileClick} {...others}>
                    <div className={`${prefixCls}-uploader-file-content`}>
                        {content}
                    </div>
                </li>
                /* eslint-enable */
            );
        });
    }

    handleChange(e) {
        const {lang, files, onError, maxCount, onChange} = this.props;
        let targetFiles = e.target.files;
        let currFiles = files || [];

        if (targetFiles.length === 0) {
            return;
        }

        if (currFiles.length >= maxCount) {
            onError(this.lang.maxError(maxCount));
            return;
        }

        for (let key of Object.keys(targetFiles)) {
            let file = targetFiles[key];
            this.handleFile(file, (handledFile, evt) => {
                if (onChange) {
                    onChange(handledFile, evt);
                }
                /* eslint-disable */
                findDOMNode(this.uploader).value = '';
                /* eslint-enable */
            }, e);
        }
    }

    render() {
        const {prefixCls, title, maxCount, files, onChange, className, ...others} = this.props;
        const inputProps = Object.assign({}, others);
        let currFiles = files || [];
        delete inputProps.lang;
        delete inputProps.onError;
        delete inputProps.maxWidth;

        const cls = classNames({
            [`${prefixCls}-uploader`]: true,
            [className]: className
        });

        return (
            <div className={cls}>
                <div className={`${prefixCls}-uploader-header`}>
                    <div className={`${prefixCls}-uploader-title`}>{title}</div>
                    <div className={`${prefixCls}-uploader-info`}>
                        {currFiles.length}/{maxCount}
                    </div>
                </div>
                <div className={`${prefixCls}-uploader-body`}>
                    <ul className={`${prefixCls}-uploader-files`}>
                        {this.renderFiles()}
                    </ul>
                    {currFiles.length < maxCount ? (
                        <div className={`${prefixCls}-uploader-box`}>
                            <input
                                ref={dom => this.uploader = dom}
                                className={`${prefixCls}-uploader-input`}
                                type="file"
                                accept="image/*"
                                onChange={this.handleChange.bind(this)}
                                {...inputProps}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
