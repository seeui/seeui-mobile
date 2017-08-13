/**
 * @file index page
 * @author cgzero(cgzero@cgzero.com)
 * @date 2017-05-23
 */

import {h, Component, render} from 'preact';

import ButtonDemo from '../src/button/ButtonDemo';
import ButtonMd from '../src/button/Button.md';

import InfiniteLoaderDemo from '../src/infiniteLoader/InfiniteLoaderDemo';
import InfiniteLoaderMd from '../src/infiniteLoader/InfiniteLoader.md';

import DialogDemo from '../src/dialog/DialogDemo';
import DialogMd from '../src/dialog/Dialog.md';

import IconDemo from '../src/icon/IconDemo';
import IconMd from '../src/icon/Icon.md';

import InputDemo from '../src/input/InputDemo';
import InputMd from '../src/input/Input.md';

import TabsDemo from '../src/tabs/TabsDemo';
import TabsMd from '../src/tabs/Tabs.md';

import ImageViewDemo from '../src/imageView/ImageViewDemo';
import ImageViewMd from '../src/imageView/ImageView.md';

import CarouselDemo from '../src/carousel/CarouselDemo';
import CarouselMd from '../src/carousel/Carousel.md';

import RateDemo from '../src/rate/RateDemo';
import RateMd from '../src/rate/Rate.md';

import StickyDemo from '../src/sticky/StickyDemo';
import StickyMd from '../src/sticky/Sticky.md';

import SearchBoxDemo from '../src/searchbox/SearchBoxDemo';
import SearchBoxMd from '../src/searchbox/SearchBox.md';

import UploaderDemo from '../src/uploader/UploaderDemo';
import UploaderMd from '../src/uploader/Uploader.md';

import './index.styl';
import logo from './logo.png';

class Panel extends Component {
    render() {
        return (
            <div className="panel">{this.props.children}</div>
        );
    }
}

class MdContainer extends Component {
    render() {
        return (
            <div className="md-container" dangerouslySetInnerHTML={{__html: this.props.children}}></div>
        );
    }
}

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <header>
                        <h1><img src={logo} className="logo" />SeeUI Mobile</h1>
                    </header>
                    {
                        // 搜索必须放在最上面
                    }
                    <Panel>
                        <h2>SearchBox 搜索条</h2>
                        <SearchBoxDemo />
                        <MdContainer>{SearchBoxMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Button 按钮</h2>
                        <ButtonDemo />
                        <MdContainer>{ButtonMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Dialog 浮层</h2>
                        <DialogDemo />
                        <MdContainer>{DialogMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Icon图标</h2>
                        <IconDemo />
                        <MdContainer>{IconMd}</MdContainer>
                    </Panel>

                    <Panel>
                        <h2>Input 输入框</h2>
                        <InputDemo/>
                        <MdContainer>{InputMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>ImageView 图片预览</h2>
                        <ImageViewDemo/>
                        <MdContainer>{ImageViewMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Tabs 选项</h2>
                        <TabsDemo/>
                        <MdContainer>{TabsMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Carousel 跑马灯</h2>
                        <CarouselDemo />
                        <MdContainer>{CarouselMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Rate 打分</h2>
                        <RateDemo />
                        <MdContainer>{RateMd}</MdContainer>
                    </Panel>
                    <Panel>
                        <h2>Sticky 吸顶</h2>
                        <StickyDemo />
                        <MdContainer>{StickyMd}</MdContainer>
                    </Panel>

                    <Panel>
                        <h2>Uploader 上传</h2>
                        <UploaderDemo />
                        <MdContainer>{UploaderMd}</MdContainer>
                    </Panel>
                    {
                        // 无限下拉必须放在最下面
                    }
                    <Panel>
                        <h2>InfiniteLoader 无限下拉</h2>
                        <InfiniteLoaderDemo/>
                        <MdContainer>{InfiniteLoaderMd}</MdContainer>
                    </Panel>
                </div>
            </div>
        );
    }
}

render(
    <Index />,
    document.getElementById('app')
);
