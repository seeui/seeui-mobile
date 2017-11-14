/**
 * @file SeeUI
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-06-27
 */

// for react devtools
import 'preact/devtools';

// 组件
import Button from './button/Button';
import InfiniteLoader from './infiniteLoader/InfiniteLoader';
import Dialog, {SingleDialog} from './dialog/Dialog';
import Alert, {SingleAlert} from './dialog/Alert';
import Confirm, {SingleConfirm} from './dialog/Confirm';
import Icon from './icon/Icon';
import Input from './input/Input';
import Tabs from './tabs/Tabs';
import Tab from './tabs/Tab';
import ImageView, {SingleImageView} from './imageView/ImageView';
import Carousel from './carousel/Carousel';
import CarouselItem from './carousel/CarouselItem';
import Rate from './rate/Rate';
import SearchBox from './searchbox/SearchBox';
import Uploader from './uploader/Uploader';
import Sticky from './sticky/Sticky';
import Checkbox from './checkbox/Checkbox';
import CheckboxGroup from './checkbox/CheckboxGroup';
import Toast, {SingleToast} from './toast/Toast';

// 工具函数
import Singleton from './util/Singleton';
import Gesture from './util/Gesture';
import {lockWindow, unLockWindow} from './util/windowScrollHelper';
import imgCompress from './util/imgCompress';

export {
    // 组件
    Button,
    InfiniteLoader,
    Dialog,
    SingleDialog,
    Alert,
    SingleAlert,
    Confirm,
    SingleConfirm,
    Icon,
    Input,
    Tabs,
    Tab,
    ImageView,
    SingleImageView,
    Carousel,
    CarouselItem,
    Rate,
    SearchBox,
    Uploader,
    Sticky,
	Checkbox,
    CheckboxGroup,
    Toast,
    SingleToast,

    // 工具函数
    Singleton,
    Gesture,
    lockWindow,
    unLockWindow,
    imgCompress
};
