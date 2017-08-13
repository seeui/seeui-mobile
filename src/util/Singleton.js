/**
 * @file react singleton
 * https://github.com/Caesor/react-singleton
 * @author cgzero(cgzero@cgzero.com)
 * @time 2017-07-08
 */

import {h} from 'preact';
import {render, unmountComponentAtNode} from 'preact-compat';

export default class Singleton {
    constructor(component) {
        this.dom = null;
        this.component = component;
        this.instance = null;
    }

    show(option) {
        if (!this.dom) {
            this.dom = document.createElement('div');
            document.body.appendChild(this.dom);
        }

        const Component = this.component;

        this.instance = render(<Component {...option}/>, this.dom);
        // this.instance.setState({
        //     show: true
        // });
    }

    hide() {
        if (this.instance) {
            unmountComponentAtNode(this.dom);
            // this.instance.props.show = false;
            // this.instance.setState({
            //     show: false
            // }, () => {
            //     setTimeout(() => {
            //         unmountComponentAtNode(this.dom);
            //     }, 100);
            // });
        }
    }
}
