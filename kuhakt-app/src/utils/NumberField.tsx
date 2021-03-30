import * as React from "react";
import { Input } from 'antd'; // Tooltip

// function formatNumber(value: any) {
//     value += '';
//     const list = value.split('.');
//     const prefix = list[0].charAt(0) === '-' ? '-' : '';
//     let num = prefix ? list[0].slice(1) : list[0];
//     let result = '';
//     while (num.length > 3) {
//         result = `,${num.slice(-3)}${result}`;
//         num = num.slice(0, num.length - 3);
//     }
//     if (num) {
//         result = num + result;
//     }
//     return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
// }

class NumericInput extends React.Component<any, any> {
    // eslint-disable-next-line
    constructor(props: any) { super(props); }
    onChange = (e: any) => {
        const { value } = e.target;
         // eslint-disable-next-line
        // const reg = new RegExp("/^-?\d*(\.\d*)?$/");
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        } else {
            this.props.onChange('');
        }
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange }: any = this.props;
        if(value !== undefined){
            let valueTemp = value;
            if (value.charAt(value.length - 1) === '.' || value === '-') {
                valueTemp = value.slice(0, -1);
            }
            onChange(valueTemp.replace(/0*(\d+)/, '$1'));
            if (onBlur) {
                onBlur();
            }
        }
        
    };

    render() {
        // const { value }: any = this.props;
        // const title = value ? (
        //     <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        // ) : (
        //     'Input a number'
        // );
        return (
            // <Tooltip
            //     trigger={['focus']}
            //     title={title}
            //     placement="topLeft"
            //     overlayClassName="numeric-input"
            // >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                />
            // </Tooltip>
        );
    }
}

export default NumericInput;