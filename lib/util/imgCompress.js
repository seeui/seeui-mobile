/**
 * @file 前端图片压缩
 * @author liulangyu(liulangyu@baidu.com)
 * @date 2014-10-23
 */

/**
 * 将datauri转为blob(包含有只读原始数据的类文件对象)
 *
 * @inner
 * @param {string} dataURI dataURI字符串
 *
 * @return {Blob} Blob对象
 */
function dataURIToBlob(dataURI) {
    let byteStr;
    let parts = dataURI.split(',');

    if (~parts[0].indexOf('base64')) {
        byteStr = atob(parts[1]);
    }
    else {
        byteStr = decodeURIComponent(parts[1]);
    }

    let ab = new ArrayBuffer(byteStr.length);
    let intArray = new Uint8Array(ab);

    for (let i = 0, len = byteStr.length; i < len; i++) {
        intArray[i] = byteStr.charCodeAt(i);
    }

    let mimetype = parts[0].split(':')[1].split(';')[0];

    return arrayBufferToBlob(ab, mimetype);
}

/**
 * arraybuffer转blob
 *
 * @inner
 * @param {ArrayBuffer} buffer 二进制数据
 * @param {string} type filetype
 * @return {Blob} blob文件对象
 */
function arrayBufferToBlob(buffer, type) {
    let Builder = window.BlobBuilder || window.WebKitBlobBuilder;

    // android不支持直接new Blob, 只能借助blobbuilder.
    if (Builder) {
        let bb = new Builder();
        bb.append(buffer);
        return bb.getBlob(type);
    }

    return new Blob([buffer], type ? {type} : {});
}

/**
 * 获取压缩优化后的blob对象  默认缩放
 *
 * @public
 * @param {Object} opts 配置项
 * @param {Object} opts.file 文件对象
 * @param {number=} opts.width 最大宽度，默认为原图width
 * @param {number=} opts.height 最大高度，默认为原图height
 * @param {number=} opts.quality 压缩质量，默认为1
 * @param {Function=} opts.callback 回调函数，参数为文件对象
 */

export default function imgCompress(opts = {}) {
    if (!opts.file) {
        throw new Error('no required argument: file');
    }

    if (!opts.callback) {
        throw new Error('no required argument: callback');
    }

    let cb = typeof opts.callback === 'function' ? opts.callback : function () {};
    let quality = opts.quality || 1;

    let file = opts.file;

    // 如果是gif的，就不用压缩了，现在的压缩效果好差!!!
    // png的，暂时也不压缩了，比例比较小，
    let notAllowed = ['image/gif', 'image/png'];
    if (notAllowed.indexOf(file.type) > -1) {
        cb(file);
        return;
    }

    // 如果size大于500K，改变quality
    if (file.size > 0.5 * 1024 * 1024) {
        quality = 0.75;
    }

    let url = window.URL || window.webkitURL || '';
    if (url) {
        // 压缩生成的base64数据
        let retBase64 = '';

        let objectURL = url.createObjectURL(file);

        let img = new Image();
        img.src = objectURL;

        img.onload = function () {
            let w = this.width;
            let h = this.height;

            let maxW = opts.width || w;
            // let maxH = opts.height || h;

            // TODO 简单缩放，height暂时不处理啦
            let scale = w / h;

            if (maxW < w) {
                w = maxW;
                h = w / scale;
            }

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            canvas.setAttribute('width', w);
            canvas.setAttribute('height', h);
            ctx.drawImage(this, 0, 0, w, h);

            // 文件类型处理
            retBase64 = canvas.toDataURL('image/jpeg', quality);

            let compressedFile = dataURIToBlob(retBase64);

            // 压缩之后，尺寸比原来的大，则还使用原来的文件
            if (compressedFile.size >= file.size) {
                compressedFile = file;
            }
            cb(compressedFile);
        };
    }
    else {
        cb(file);
    }
}

//# sourceMappingURL=imgCompress.js.map
