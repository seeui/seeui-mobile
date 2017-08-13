/**
 * @file 拷贝于koubei  语言增强模块
 * @author cgzero(cgzero@cgzero.com)
 * @date 2017-04-27
 */


/**
 * 获取字符在gbk编码下的字节长度, 实现原理是认为大于127的就一定是双字节。如果字符超出gbk编码范围, 则这个计算不准确
 *
 * @public
 * @param {string} source 目标字符串
 * @return {number} 字节长度
 */
export function getByteLength(source) {

    return String(source)
        .replace(/[^\x00-\xff]/g, 'ci').length;
}

/**
 * 对目标字符串进行html编码
 *
 * @public
 * @param {string} source 目标字符串
 * @return {string} html编码后的字符串
 */
export function encodeHTML(source) {
    return String(source)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * 对目标字符串进行html解码
 *
 * @public
 * @param {string} source 目标字符串
 * @return {string} html解码后的字符串
 */
export function decodeHTML(source) {
    let str = String(source)
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    // 处理转义的中文和实体字符
    return str.replace(/&#([\d]+);/g, function (_0, _1) {
        return String.fromCharCode(parseInt(_1, 10));
    });
}


/**
 * 删除目标字符串内的所有空白字符
 *
 * @public
 * @param {string} source 目标字符串
 * @return {string} 删除所有空白字符后的字符串
 */

export function trimAll(source) {
    let trimer = new RegExp('[\\s\\t\\xa0\\u3000]+', 'g');
    return String(source).replace(trimer, '');
}
