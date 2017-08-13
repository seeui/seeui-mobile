# Dialog API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
show | 是否显示 | boolean | `false`
width | 内容宽度，需要携带单位 | string | -
hasClose | 是否有关闭按钮 | boolean | `true`
closeContent | 关闭按钮内容 | string/VDom | `VDom`
title | 标题内容 | string | -
buttons | 底部按钮集合 | Array | -
maskClickClose | 是否点击背景关闭 | boolean | `false`
onShow | 浮层显示回调 | Function | -
onHide | 浮层关闭回调，必选，用来控制父组件的状态改变  | Function | -
className | 额外类名 | string | -
