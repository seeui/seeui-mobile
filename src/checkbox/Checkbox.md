# Checkbox Api

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked | 设置是否选中 | boolean | `false`
onChange | 变化时回调函数 | Function({checked: boolean, value: string}) | -

# CheckboxGroup Api

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
options | 指定可选项 | string[] | `[]`
value | 指定选中的选项 | string[] | `[]`
onChange | 变化时回调函数 | Function(checkedValue: string[]) | -