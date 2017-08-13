# InfiniteLoader API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
minHeight | 预加载高度范围，默认值为`500` | number | 500
minDistance | 最小的 touch 移动距离，忽略过小的移动，默认值为`10` | number | 10
loaderDefaultIcon | 数据都已全部加载完后显示的默认元素（图标） | string/VDom | `VDom`
loaderLoadingIcon | loading 时显示的元素（图标） | string/VDom | `VDom`
loaderMoreIcon | 触发加载时显示的元素（图标） | string/VDom | `VDom`
onLoadMore | 加载内容的回调函数 | Function | -
disabled | 是否禁止滚动加载 | boolean | `false`
