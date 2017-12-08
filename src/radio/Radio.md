# Radio Api

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked | 设置是否选中 | boolean | `false`
onChange | 当从没选中变为选中时才会回调 | Function({checked: boolean, value: string})| -
disabled | 是否禁用 | boolean | `false`
className | 额外类名 | string | -

# RadioGroup Api

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
options | 指定可选项 | string[] | `[]`
value | 指定选中的选项 | string / number[] | `[]`
name | 内部input分组 | string | -
onChange | 变化时回调函数 | Function(checkedValue: string[])| -
className | 额外类名 | string | -