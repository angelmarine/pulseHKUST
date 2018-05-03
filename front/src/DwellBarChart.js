import React, { Component } from 'react'
import './styles/App.css'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Bar } from 'recharts';
const R = require('ramda');

class DwellBarChart extends Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.formatLabelTooltip = this.formatLabelTooltip.bind(this);
        this.formatTooltip = this.formatTooltip.bind(this);
        this.getSortedData = this.getSortedData.bind(this);

        this.state = {
            data: this.getSortedData(this.props.data)
        }
    }

    formatLabelTooltip(value){
        return "Time of the day : " + value + ":00";
    }

    formatTooltip(value){
        return value.toFixed(2) +
            " minutes (Click the bar to see hourly statistics)";
    }

    getSortedData(d){
        const ascend = R.ascend(R.prop('hour'));
        return R.sort(ascend, d);
    }

    // make it change to pie chart
    onClick(data, index){
        let hour = this.state.data[index]['hour'];
        this.props.changeToPieChart(true, hour);
    }

    render() {
        return (
            <div>
                <div style={{height:'15%'}}> </div>
                <BarChart width={650} height={450} data={this.state.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis label={{ value: "Time (Hours)", position: 'insideBottom', offset: -5 }} dataKey="hour"/>
                    <YAxis label={{ value: "Average Dwelling Time (min)", angle: -90, position: 'insideLeft'}}/>
                    <Tooltip formatter={this.formatTooltip} labelFormatter={this.formatLabelTooltip}/>
                    <Bar type={'monotone'} dataKey="avg" fill="#8cad88" animationBegin={1000} onClick={this.onClick}/>
                </BarChart>
            </div>
        )
    }
}

export default DwellBarChart;