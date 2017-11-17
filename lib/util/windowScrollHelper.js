/**
 * @file windowScrollHelper 开锁屏
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/30
 */

import {setStyle, getStyle, children} from './dom';

let originalHTMLBodySize = {};

/**
 * 阻止对应dom元素的scroll样式
 *
 * @param {Element} ele dom元素
 * @return {Element}
 */
function stopWindowScrolling(ele) {
    let lockNum = ele.getAttribute('data-lock') || '0';
    let tagName = ele.tagName.toLowerCase();

    lockNum = parseInt(lockNum, 10);

    // 可能存在多个组件的现实与隐藏触发锁屏和解锁，所以累加在一起
    ele.setAttribute('data-lock', lockNum + 1);

    if (lockNum === 0) {
        originalHTMLBodySize[tagName] = {
            width: getStyle(ele, 'width'),
            height: getStyle(ele, 'height'),
            overflow: getStyle(ele, 'overflow'),
            scrollTop: ele.scrollTop
        };
        setStyle(ele, 'width', '100%');
        setStyle(ele, 'height', '100%');
        setStyle(ele, 'overflow', 'hidden');

        if (tagName === 'body') {
            ele.scrollTop = 0;
        }
    }

    return ele;
}

/**
 * 取消对应dom元素的scroll样式
 *
 * @param {Element} ele dom元素
 * @return {Element}
 */
function restoreWindowScrolling(ele) {
    let lockNum = ele.getAttribute('data-lock') || '0';
    let tagName = ele.tagName.toLowerCase();

    lockNum = parseInt(lockNum, 10);

    if (lockNum > 1) {
        ele.setAttribute('data-lock', lockNum - 1);
    }
    else if (lockNum === 1) {
        ele.removeAttribute('data-lock');

        const size = originalHTMLBodySize[tagName];

        setStyle(ele, 'width', size.width);
        setStyle(ele, 'height', size.height);
        setStyle(ele, 'overflow', size.overflow);

        if (tagName === 'body' || tagName === 'html') {
            ele.scrollTop = size.scrollTop;
        }

        delete originalHTMLBodySize[tagName];
    }

    return ele;

}

/**
 * 设置外层容器的位置
 *
 * @inner
 * @param {Element=} wrapper 页面内容最外层容器，非body
 */
function setWrapperPostion(wrapper) {
    if (!wrapper) {
        return;
    }

    wrapper.scrollTop = originalHTMLBodySize.body.scrollTop;
}

/**
 * 还原外层容器的位置
 *
 * @inner
 * @param {Element=} wrapper 页面内容最外层容器，非body
 */
function restoreWrapperPostion(wrapper) {
    if (!wrapper) {
        return;
    }

    wrapper.scrollTop = 0;
}

/**
 * 锁屏
 *
 * @public
 * @param {HTMLElement=} wrapper 所有内容外层容器
 */
export function lockWindow(wrapper) {
    wrapper = wrapper || children(document.body)[0];

    stopWindowScrolling(wrapper);

    let element = wrapper;

    while ((element = element.parentNode) && element !== document) {
        stopWindowScrolling(element);
    }

    setWrapperPostion(wrapper);
}

/**
 * 解锁
 *
 * @public
 * @param {Element=} wrapper 页面内容最外层容器，非body
 */
export function unLockWindow(wrapper) {
    wrapper = wrapper || children(document.body)[0];

    restoreWrapperPostion(wrapper);
    restoreWindowScrolling(wrapper);

    let element = wrapper;

    while ((element = element.parentNode) && element !== document) {
        restoreWindowScrolling(element);
    }
}

//# sourceMappingURL=windowScrollHelper.js.map
