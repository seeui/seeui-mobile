# Button API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
imagelist | 要预览的图片列表 | Array | -
onHide | 关闭回调 | function | -
current | 当前展示的图片序号 | number | 0
gap | 轮播图间距 | number | 30
maxScale | 最大缩放倍数 | number | 2
disableDoubleTap | 禁用双击放大 | bool | `false`
onInit | 初始化后回调 | Function | `false`
onLongTap | 长按回调 | Function | `false`
onChangeIndex | 轮播后回调 | Function | `false`
showDeleteBtn | 是否展示删除按钮 | boolean | `false`
onDelete | 删除回调 | Function | -
className | 额外类名 | string | -