# Uploader API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
files | 图片数组 | Object[] | -
files[].url | 图片 | string | -
files[].status | 图片状态，可填任意文字 | string | -
files[].error | 图片是否错误 | boolean | -
files[].loading | 是否正在加载中 | boolean | -
lang | 各种提示文案 | Object | -
lang.maxError | 图片数量错误提示文案 | Function(maxCount: number) | `Function`
lang.typeError | 格式错误提示文案 | string | 上传文件的格式必须为图片
lang.sizeError | 容量大小错误提示文案 | Function(min: string, max: string) | `Function`
maxCount | 最大上传数量 | number | 9
maxSize | 最大容量 | number | 5 \* 1024 \* 1024
minSize | 最小容量 | number | 0
maxWidth | 最大展示宽度 | number | 500
onStart | 点击上传按钮处理函数 | Function(file: File, stop: Function) | -
onChange | 上传处理函数 | Function(file: File) | -
onError | 失败处理函数 | Function(msg: string) | -
className | 额外类名 | string | -