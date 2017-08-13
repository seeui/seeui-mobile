# Uploader API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
files | 图片数组 | array | -
files[].url | 图片 | string | -
files[].status | 图片状态 | string | -
files[].error | 图片是否错误 | boolean | -
lang | 各种提示文案 | Object | -
lang.maxError | 错误提示文案 | Function | `Function`
maxCount | 最大上传数量 | number | 9
maxWidth | 最大展示宽度 | number | 500
onChange | 上传处理函数 | Function | -
onError | 失败处理函数 | Function | -
className | 额外类名 | string | -