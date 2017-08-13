/**
 * @file ImageView demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-08
 */

import {h, Component} from 'preact';
import {SingleImageView} from './ImageView';


export default class ImageViewDemo extends Component {
    show(imagelist, current) {

        // 用于大图展示的列表
        let rawList = [];
        for (let item of imagelist) {
            rawList.push(item.raw);
        }

        SingleImageView.show({
            imagelist: rawList,
            current: current,
            onHide() {
                SingleImageView.hide();
            }
        });
    }

    render() {
        let imagelist = [
            {
                thumb: 'http://i2.kiimg.com/1949/f2c01dfe25649fd7t.jpg',
                raw: 'http://i2.kiimg.com/1949/f2c01dfe25649fd7s.jpg'
            },
            {
                thumb: 'http://i2.kiimg.com/1949/9458344e7e9986eat.jpg',
                raw: 'http://i2.kiimg.com/1949/9458344e7e9986eas.jpg'
            },
            {
                thumb: 'http://i2.kiimg.com/1949/984ee020934108b7t.jpg',
                raw: 'http://i2.kiimg.com/1949/984ee020934108b7s.jpg'
            }
        ];

        return (
            <div className="imageview-demo">
                <ul>
                {
                    imagelist.map(({thumb}, i) => (
                        <li>
                            <div
                                className="pic"
                                style={{backgroundImage: `url(${thumb})`}}
                                onClick={this.show.bind(this, imagelist, i)}
                            ></div>
                        </li>
                    ))
                }
                </ul>
            </div>
        );
    }
}

//# sourceMappingURL=ImageViewDemo.js.map
