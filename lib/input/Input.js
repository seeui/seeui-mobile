/**
 * @file Input
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-06
 */

import {h, Component} from 'preact';
import classNames from 'classnames';


export default class Input extends Component {

    static defaultProps = {
        prefixCls: 'cui',
        type: 'text'
    };

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handleKeyDown(e) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    render() {
        const {prefixCls, type, className, ...others} = this.props;

        const cls = classNames({
            [`${prefixCls}-input`]: true,
            [className]: className
        });

        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        className={cls}
                        {...others}
                    />
                );
            default:
                return (
                    <input
                        className={cls}
                        type={type}
                        {...others}
                    />
                );
        }
    }
}

//# sourceMappingURL=Input.js.map
