/**
 * @file Tab项
 * @author BabyLillian<719898036@qq.com>
 * @date 2017-07-08
 */

import {h, Component} from 'preact';
import classNames from 'classnames';


export default class Tab extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        // 是否选中
        selected: false,
        // 是否禁用
        disabled: false,
        // tab的title
        label: '',
        // 序号
        index: 0,
        // 点击
        onClick() {}
    };

    render({prefixCls, className, selected, disabled, children, index, href, onClick, ...others}) {


        const CellComponent = href ? 'a' : 'div';

        const cls = classNames({
            [`${prefixCls}-tabs-tab`]: true,
            [`${prefixCls}-tabs-tab-active`]: selected,
            [`${prefixCls}-tabs-tab-disabled`]: disabled,
            [className]: className
        });

        return (
            <CellComponent
                className={cls}
                href={href}
                onClick={e => disabled || onClick(e, index)}
                {...others}
            >
                <span className={`${prefixCls}-tabs-tab-txt`}>
                    {children}
                </span>
            </CellComponent>
        );
    }
}

//# sourceMappingURL=Tab.js.map
