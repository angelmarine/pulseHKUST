import React, { Component } from 'react'
import './styles/App.css'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Bar } from 'recharts';
import 'whatwg-fetch'

class CountBarChart extends Component {

    constructor(props){
        super(props);
        this.loadData = this.loadData.bind(this);
        this.loadBarChart = this.loadBarChart.bind(this);
        this.loadDefaultMessage = this.loadDefaultMessage.bind(this);
        this.formatLabelTooltip = this.formatLabelTooltip.bind(this);
        this.state = {
            loaded: this.loadDefaultMessage(),
            data: null
        }
    }

    componentDidMount() {
        if(this.props.clickedElement === "none"){
        }
        else {
            this.loadData(this.props.clickedElement, this.props.dateTime).then(() => {
                this.setState({
                    loaded: this.loadBarChart()
                })
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.clickedElement === "none") {
        }
        else{
            this.loadData(nextProps.clickedElement, nextProps.dateTime).then(() => {
                this.setState({
                    loaded: this.loadBarChart()
                })
            })
        }
    }

    formatLabelTooltip(value){
        return "Time of the day : " + value;
    }

    loadDefaultMessage(){
        return <div> Loading... </div>
    }

    loadData(clickedElement, targetDate){
        // load data of clicked element using the api
        let url = 'http://localhost:8888/api/data/date/hourly/group=' + clickedElement + "&date=" + targetDate.format('YYYY-MM-DD');
        console.log("Sending request to server: " + url);
        return fetch(url)
            .then((response) => {
                    return response.json()
                })
            .then((data) => {
                this.setState({
                    data: data['data']
                });
            })
            .catch(function(ex) {
                console.log('parsing failed', ex)
            });
    }

    loadBarChart(){
        return (<div>
            <div style={{height:'15%'}}> </div>
            <BarChart width={650} height={450} data={this.state.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Time", position: 'insideBottom', offset: -5 }} dataKey="time"/>
                <YAxis label={{ value: "Crowd size", angle: -90, position: 'insideLeft' }}/>
                <Tooltip labelFormatter={this.formatLabelTooltip}/>
                <Bar type={'monotone'} dataKey="Count" fill="#8884d8" animationBegin={1500} />
            </BarChart>
        </div>)
    }

    render() {
        return <div>
                {this.state.loaded}
            </div>
    }
}

export default CountBarChart;