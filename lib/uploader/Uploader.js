/**
 * @file Input
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-06
 */

import {h, Component} from 'preact';
import {findDOMNode} from 'preact-compat';
import classNames from 'classnames';
import Icon from '../icon/Icon';


export default class Uploader extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        title: '图片上传',
        maxCount: 9,
        maxWidth: 500,
        files: [],
        onChange: undefined,
        onError: undefined,
        lang: {
            maxError(maxCount) {
                return `最多只能上传${maxCount}张图片`;
            }
        }
    };

    handleFile(file, cb) {
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
                ctx.drawImage = (drawImg, sx, sy, sw, sh, dx, dy, dw, dh) => {
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
            let {url, error, status, onClick, ...others} = file;
            let fileStyle = {
                backgroundImage: `url(${url})`
            };
            let cls = classNames({
                [`${prefixCls}-uploader-file`]: true,
                [`${prefixCls}-uploader-file-status`]: error || status
            });

            let handleFileClick = onClick ? onClick : e => {
                onFileClick && onFileClick(e, file, idx);
            };

            return (
                <li className={cls} key={idx} style={fileStyle} onClick={handleFileClick} {...others}>
                    {
                        error || status ? (
                            <div className={`${prefixCls}-uploader-file-content`}>
                                { error ? <Icon type="warn-fill" /> : status }
                            </div>
                        ) : false
                    }
                </li>
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
            onError(lang.maxError(maxCount));
            return;
        }

        for (let key of Object.keys(targetFiles)) {
            let file = targetFiles[key];
            this.handleFile(file, (handledFile, evt) => {
                if (onChange) {
                    onChange(handledFile, evt);
                }
                findDOMNode(this.uploader).value = '';
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

//# sourceMappingURL=Uploader.js.map
