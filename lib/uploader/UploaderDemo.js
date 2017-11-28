/**
 * @file Uplaoder demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-25
 */

/* eslint-disable no-console */
import {h, Component} from 'preact';
import Uploader from './Uploader';
import {SingleImageView} from '../imageView/ImageView';
import imgCompress from '../util/imgCompress';

export default class InputDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [
                {
                    url: 'http://i2.kiimg.com/1949/f2c01dfe25649fd7t.jpg'
                },
                {
                    url: 'http://i2.kiimg.com/1949/9458344e7e9986eat.jpg'
                },
                {
                    url: 'http://i2.kiimg.com/1949/984ee020934108b7t.jpg'
                },
                {
                    url: 'http://i2.kiimg.com/1949/984ee020934108b7t.jpg',
                    error: true
                },
                {
                    url: 'http://i2.kiimg.com/1949/984ee020934108b7t.jpg',
                    status: '50%'
                },
                {
                    url: 'http://i2.kiimg.com/1949/984ee020934108b7t.jpg',
                    loading: true
                }
            ]
        };
    }

    show(imagelist, current) {

        // 用于大图展示的列表
        let rawList = [];
        for (let item of imagelist) {
            rawList.push(item.url);
        }

        SingleImageView.show({
            imagelist: rawList,
            current: current,
            showDeleteBtn: true,
            enableRotate: true,
            onDelete: idx => {
                console.log(`删除了第${idx}张图片`);
                SingleImageView.hide();

                let newFiles = this.state.files;
                newFiles.splice(idx, 1);
                this.setState({
                    files: newFiles
                });
            },
            onHide() {
                SingleImageView.hide();
            }
        });
    }

    render() {
        return (
            <div>
                <Uploader
                    files={this.state.files}
                    maxCount={9}
                    maxWidth={500}
                    onError={msg => alert(msg)}
                    onChange={file => {
                        // 展示时取file的base64：file.data
                        let newFiles = [...this.state.files, {url: file.data}];
                        this.setState({
                            files: newFiles
                        });

                        // 这里需要进行上传操作，可以调用图片压缩函数预先处理
                        // 上传时取file的原始数据：file.nativeFile
                        console.log('压缩前：', `${file.size}kb`);
                        imgCompress({
                            file: file.nativeFile,
                            width: 500,
                            callback(compressedFile) {
                                console.log('压缩后：', `${compressedFile.size}kb`);

                                // 这里可以进行上传ajax处理了
                            }
                        });
                    }}
                    onFileClick={
                        (e, file, i) => {
                            console.log('file click', file, i);
                            // 预览图片
                            this.show(this.state.files, i);

                            // TODO 还可以扩展 imageView 加入图片旋转功能
                        }
                    }
                    lang={{
                        maxError(maxCount) {
                            return `您上传的图片超出限制咯，最大上传${maxCount}张`;
                        }
                    }}
                />
            </div>
        );
    }
}

//# sourceMappingURL=UploaderDemo.js.map
