# Tabs API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | tab类型，可选值为 `blockline` `txtline` | string | blockline
widthType | tab布局类型，可选值为 `auto`自适应宽度，超出视口大小出滚动条， `all`所有tab占满当前视口 | string | auto
selectedIndex | 当前选中的tab的索引| number | 0
onChange | `click tab` 事件的 handler | Function | -
scrollSize | 滚动tab的步长 | number | -74
hasAnimate | 切换tab时底边是否有滑动动画 | boolean | `true`


# Tab

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
disabled | tab可用状态 | boolean | `false`
