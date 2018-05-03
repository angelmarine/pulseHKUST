import React from 'react'
import 'whatwg-fetch'
import DwellBarChart from "./DwellBarChart";
import DwellPieChart from "./DwellPieChart";

const displayStyle = {
    fontSize:'16px',
    color:'#1385e5',
    margin: '16px 16 16 16',
    padding: '12px 12',
    width:'100%',
    background: '#FFFFFF',
    border: '5px solid #FFFFFF',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontFamily: 'Tahoma, Verdana, Segoe, sans-serif'
};

class DwellChart extends React.Component{

    constructor(props){
        super(props);
        this.changeToPieChart = this.changeToPieChart.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadDefaultMessage = this.loadDefaultMessage.bind(this);
        this.loadDwellChart = this.loadDwellChart.bind(this);
        
        this.state = {
            loaded: this.loadDefaultMessage(),
            pie: false,
            hour: -1,
            data: null
        }
    }

    componentDidMount() {
        if(this.props.clickedElement === "none"){
        }
        else{
            this.loadData(this.props.clickedElement, this.props.dateTime).then(() => {
                this.setState({
                    loaded: this.loadDwellChart()
                })
            })
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.clickedElement === "none"){
        }else{
            this.loadData(nextProps.clickedElement, nextProps.dateTime).then(() => {
                this.setState({
                    loaded: this.loadDwellChart()
                })
            })
        }
    }

    changeToPieChart(b, hour){
        this.setState({
            pie: b,
            hour: hour
        });

        setTimeout(() => {
            this.setState({loaded: this.loadDwellChart()})
        }, 1000);

    }

    loadDefaultMessage(){
        return <div> Loading... </div>
    }


    loadData(clickedElement, targetDate){
        // load data of clicked element using the api
        let url = 'http://localhost:8888/api/data/dwell/group=' + clickedElement + "&date=" + targetDate.format('YYYY-MM-DD');
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

    loadDwellChart(){
        if(!this.state.pie){
            return <div><DwellBarChart data={this.state.data} changeToPieChart={this.changeToPieChart} /></div>
        }
        else{
            return (<div>
                <div className="input">
                    <input type="text" style={displayStyle} value={"Hourly Statistics of Dwelling Time at: "+ this.state.hour + ":00"} readOnly />
                </div>
                <DwellPieChart data={this.state.data} hour={this.state.hour} changeToPieChart={this.changeToPieChart}/>
            </div>)
        }
    }


    render(){
        return <div>{this.state.loaded}</div>;
    }
}

export default DwellChart;