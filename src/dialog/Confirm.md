# Confirm API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
prefixCls | 类名前缀 | string | `cui`
width | 内容宽度，需要携带单位 | string | -
close | 是否有关闭按钮 | boolean | `true`
closeContent | 关闭按钮内容 | string/jsx | `x`
title | 标题内容 | string | -
maskClickClose | 是否点击背景关闭 | boolean | `false`
buttons | 按钮配置 | Object | `[{role: 'submit', value: '确定', type: 'primary', size: 'large'}, {role: 'cancel', value: '取消', type: 'default', size: 'large'}]`
onSubmit | 点击确定回调，`return false`会阻止关闭 | Function | -
onCancel | 点击确定回调，`return false`会阻止关闭 | Function | -
onHide | 浮层关闭回调，能够监控到是背景点击还是关闭图标点击  | Function | -
className | 类名 | string | -
others | 其他属性 | Object | -