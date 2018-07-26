import React from "react";
import '../../styles/custom-checkbox.css'
const R = require('ramda');

const legendStyle = {
    position: 'absolute',
    bottom: '50%',
    paddingLeft: '70px'
};

const abbrFor = {
    nor: 'North Bus Station',
    sou: 'South Bus Station',
    ctlg1: 'LG1 Canteen',
    ctlg5: 'LG5 Canteen',
    ctlg7: 'LG7 Canteen',
    lib: 'Library',
    hall:'Student Hall'
};

class StreamLegend extends React.Component {

    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.state = {
            key: 0
        }
    }

    handleItemChange(e) {
        let newData = R.clone(this.props.data);
        console.log(e.target);
        newData.forEach(item => {
            if(item.theme === e.target.value) {
                item.display_status = e.target.checked
            }
        });
        this.setState({ key: Math.random() });
        this.props.onChange(newData);
    }

    render() {
        let options;
        const reversedData = R.reverse(this.props.data);
        options = reversedData.map(function(item, index) {
            return (
                <div key={'chk-' + index}>
                    <label className="container">
                        <span className="legend-color" style={{backgroundColor: item.color}}> </span>
                        <input
                            type="checkbox"
                            value={item.theme}
                            onChange={this.handleItemChange}
                            checked={item.display_status} />
                        {abbrFor[item.theme]}
                        <span className="checkmark"></span>
                    </label>
                </div>
            );
        }.bind(this));

        return (
            <div
                style={legendStyle}
                className="legend ib">
                {options}
            </div>
        );
    }
}

export default StreamLegend;