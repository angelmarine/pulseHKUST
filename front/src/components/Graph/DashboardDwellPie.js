import React, { Component } from 'react'
import '../../styles/app.css'
import { Cell, PieChart, Pie, Tooltip} from 'recharts';
const R = require('ramda');


const COLORS = ['#0088FE', '#FF8042', '#FFBB28','#00C49F', '#8cad88'];

class DashboardDwellPie extends Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.getHourlyData = this.getHourlyData.bind(this);
        this.formatTooltip = this.formatTooltip.bind(this);
    }

    formatTooltip(value, name){
        return value + " counts (Click the chart to see daily statistics)";
    }

    getHourlyData(){
        const hourlyData = R.find(R.propEq('hour', this.props.hour))(this.props.data);
        return hourlyData['stats']
    }

    onClick(){
        this.props.changeToPieChart(false, -1);
    }

    render() {
        return (
            <div>
                <div style={{height:'15%'}}> </div>
                <PieChart width={700} height={700} onClick={this.onClick}>
                    <Pie
                         label
                         data={this.getHourlyData()}
                         dataKey="count"
                         nameKey="label"
                         cx="50%" cy="40%"
                         outerRadius={200}
                         fill="#8884d8"
                         animationBegin={1000}>
                        {
                            this.getHourlyData().map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                    <Tooltip formatter={this.formatTooltip}/>
                </PieChart>
            </div>
        )
    }
}

export default DashboardDwellPie;