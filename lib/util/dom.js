/**
 * @file dom
 * https://github.com/ecomfe/saber-dom
 * @author wuqi57(441984145@qq.com)
 * @time 17/6/12
 */

// ****************************************************
// *                      css                         *
// ****************************************************
let getComputedStyle = document.defaultView.getComputedStyle;

/**
 * 将CSS属性驼峰化
 *
 * @param {string} target 目标字符串
 * @return {string}
 */
function camelize(target) {
    return target.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

let detectEle = document.createElement('div');
let prefixes = ['webkit', 'ms', 'o'];

/**
 * 检测支持的CSS属性名称
 * 如果没有找到支持的属性名称返回原有值
 *
 * @inner
 * @param {string} property CSS属性名
 * @return {string}
 */
function detectProperty(property) {
    if (property.charAt(0) !== '-') {
        let style = detectEle.style;
        let name = camelize(property);

        if (!(name in style)) {
            name = name.charAt(0).toUpperCase() + name.substring(1);

            for (let i = 0, prefix; prefix = prefixes[i]; i++) { // jshint ignore:line
                if (prefix + name in style) {
                    property = '-' + prefix + '-' + property;
                    break;
                }
            }
        }
    }
    return property;
}

/**
 * 获取样式
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} property 属性
 * @return {string|null}
 */
export function getStyle(element, property) {
    property = detectProperty(property);
    return element.style[camelize(property)]
        || getComputedStyle(element).getPropertyValue(property);
}

/**
 * 设置样式
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} property 属性
 * @param {string} value 值
 */
export function setStyle(element, property, value) {
    property = detectProperty(property);
    element.style[camelize(property)] = value;
}

/**
 * 显示DOM元素
 *
 * @param {HTMLElement} element 目标元素
 */
export function show(element) {
    if (exports.getStyle(element, 'display') === 'none') {
        element.style.display = null;
    }
}

/**
 * 隐藏DOM元素
 *
 * @param {HTMLElement} element 目标元素
 */
export function hide(element) {
    element.style.display = 'none';
}

/**
 * 为目标元素添加className
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @param {string} className 要添加的className
 *
 * @return {HTMLElement} 目标元素
 */
export function addClass(element, className) {
    // 优先使用classList. 在iOS 5, Android 3 之后开始支持
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        let classes = element.className
            ? element.className.split(/\s+/) : [];

        for (let i = 0, n = classes.length; i < n; i++) {
            if (classes[i] === className) {
                return element;
            }
        }

        classes.push(className);
        element.className = classes.join(' ');
    }

    return element;
}

/**
 * 移除目标元素的className
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @param {string} className 要移除的className
 *
 * @return {HTMLElement} 目标元素
 */
export function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        let classes = element.className
            ? element.className.split(/\s+/) : [];

        for (let i = 0, n = classes.length; i < n; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                i--;
            }
        }
        element.className = classes.join(' ');
    }

    return element;
}

/**
 * 反转目标元素的className
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @param {string} className 要反转的className
 * @param {boolean=} isForce 强制指定添加或移除, 传入`true`则添加, 反之则移除
 *
 * @return {HTMLElement} 目标元素
 */
export function toggleClass(element, className, isForce) {
    isForce = 'boolean' === typeof isForce
        ? isForce
        : !exports.hasClass(element, className);

    exports[isForce ? 'addClass' : 'removeClass'](element, className);

    return element;
}

/**
 * 判断元素是否拥有指定的className
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @param {string} className 要判断的className
 *
 * @return {boolean} 是否拥有指定的className
 */
export function hasClass(element, className) {
    // 方法名用 hasClass，是因为 contains 在 dom 模块中可能引起歧义
    if (element.classList) {
        return element.classList.contains(className);
    }

    let classes = element.className.split(/\s+/);
    for (let i = 0, n = classes.length; i < n; i++) {
        if (classes[i] === className) {
            return true;
        }
    }

    return false;
}

/**
 * 获取元素的相对位置
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @param {HTMLElement=} offsetEle 相对元素
 * @return {Object}
 */
export function position(element, offsetEle) {
    let res = {};
    let pos = element.getBoundingClientRect();

    if (offsetEle) {
        let fixPos = offsetEle.getBoundingClientRect();
        res.left = pos.left - fixPos.left;
        res.top = pos.top - fixPos.top;
    }
    else {
        res.left = pos.left + Math.max(
                document.documentElement.scrollLeft,
                document.body.scrollLeft
            );
        res.top = pos.top + Math.max(
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
    }

    return res;
}


// ****************************************************
// *                      data                        *
// ****************************************************
let attrPrefix = 'data-';

/**
 * 设置data的值
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} key data名
 * @param {string} value data值
 */
export function setData(element, key, value) {
    element.setAttribute(attrPrefix + key, value);
}

/**
 * 获取data的值
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} key data名
 * @return {string|null} data值
 */
export function getData(element, key) {
    return element.getAttribute(attrPrefix + key);
}

/**
 * 删除指定的data项
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} key data名
 */
export function removeData(element, key) {
    element.removeAttribute(attrPrefix + key);
}


// ****************************************************
// *                  selector                        *
// ****************************************************

/**
 * 根据id获取指定的DOM元素
 *
 * @public
 * @param {string|HTMLElement} id 元素的id或DOM元素
 * @return {HTMLElement|null} 获取的元素，找不到时返回null
 */
export function g(id) {
    if (!id) {
        return null;
    }

    return typeof id === 'string' ? document.getElementById(id) : id;
}

/**
 * 根据选择器获取指定DOM元素
 *
 * @public
 * @param {string} selector 元素的selector
 * @param {HTMLElement=} context 上下文
 * @return {HTMLElement|null} 获取的元素，找不到时返回null
 */
export function query(selector, context) {
    if ('string' !== typeof selector) {
        return selector;
    }

    context = context || document.body;

    return context.querySelector(selector);
}

/**
 * 根据选择器选择DOM元素列表
 *
 * @public
 * @param {string} selector 元素的selector
 * @param {HTMLElement=} context 上下文
 * @return {Array} 获取的元素列表，找不到时为空数组
 */
export function queryAll(selector, context) {
    if (Array.isArray(selector)) {
        return selector;
    }

    context = context || document.body;

    let nodeList = context.querySelectorAll(selector);

    return Array.prototype.slice.call(nodeList);
}

/**
 * 判断DOM元素与选择器是否匹配
 *
 * @param {HTMLElement} element 目标DOM元素
 * @param {string} selector 待判断的selector
 * @return {boolean} 是否匹配
 */
export function matches(element, selector) {
    let proto = Element.prototype;
    let matches = proto.matches
        || proto.webkitMatchesSelector
        || proto.mozMatchesSelector
        || proto.msMatchesSelector;

    if (matches) {
        return matches.call(element, selector);
    }

    let elements = exports.queryAll(selector, element.parentNode);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === element) {
            return true;
        }
    }
    return false;
}


// ****************************************************
// *                  traversal                       *
// ****************************************************

/**
 * 获取元素的子节点
 *
 * @public
 * @param {HTMLElement} element 目标元素
 * @return {Array.<HTMLElement>} 子节点
 */
export function children(element) {
    let res = [];

    let items = element.children;
    for (let i = 0, item; item = items[i]; i++) { // jshint ignore:line
        if (item.nodeType === 1) {
            res.push(item);
        }
    }

    return res;
}

/**
 * 查找第一个匹配条件的祖先元素
 *
 * @param {HTMLElement} element 目标元素
 * @param {string} selector 查询条件
 * @param {HTMLElement=} context 遍历范围
 * @return {HTMLElement|null} 匹配到的节点，找不到时返回null
 */
export function closest(element, selector, context) {
    context = context || document;

    do {
        if (matches(element, selector)) {
            return element;
        }

        if (element === context) {
            return null;
        }
    }
    while ((element = element.parentNode) && element !== document);

    return null;
}

/**
 * 相对位置（取反）
 *
 * @param {HTMLElement} el 目标元素
 * @return {Object} 位置对象
 */
export function negativeOffset(el) {

    let left = -el.offsetLeft;
    let top = -el.offsetTop;

    while (el = el.offsetParent) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
    }

    return {left, top};
}

//# sourceMappingURL=dom.js.map
