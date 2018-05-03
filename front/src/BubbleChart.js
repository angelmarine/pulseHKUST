import React, { Component } from 'react'
import './styles/App.css'
import 'whatwg-fetch'
import moment from 'moment'
import background from './img/background-map-labels.png'
const d3 = require('d3');

class BubbleChart extends Component {

    constructor(props){
        super(props);
        this.createBubbleChart = this.createBubbleChart.bind(this);
        this.fillCircle = this.fillCircle.bind(this);
        this.getCount = this.getCount.bind(this);
        this.setCircleX = this.setCircleX.bind(this);
        this.setCircleY = this.setCircleY.bind(this);
        this.loadDefaultMessage = this.loadDefaultMessage.bind(this);

        this.state = {
            dateTime: this.props.dateTime,
            data: null,
            loaded: this.loadDefaultMessage()
        };
    }

    componentDidMount() {
        this.loadData(this.state.dateTime).then(() => {
            this.createBubbleChart();
        });
    }

    componentWillReceiveProps(nextProps) {
        // only update the data if the 'day' changes, not the 'time'
        if(!(nextProps.dateTime.isSame(this.props.dateTime, 'day'))){
            //load new data with new states and draw new chart
            this.loadData(nextProps.dateTime)
        }
        this.setState({
            dateTime: nextProps.dateTime
        });

        setTimeout(() => {
            this.createBubbleChart();
        }, 1000);
    }

    loadDefaultMessage(){
        return <div> Loading... </div>
    }

    loadData(targetDate){
        // load one day data of all locations using API and store in the 'data' state
        // date should be in YYYY-MM-DD format
        let url = 'http://127.0.0.1:8888/api/data/date/' + targetDate.format('YYYY-MM-DD');
        console.log("Sending request to server: " + url);

        return fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({data: data['data']});
            })
            .catch(function(ex) {
                console.log('parsing failed', ex)
            });
    };

    getCount(d){
        let count = 0;
        d['Count_timestamp'].find((elem) => {
            if(moment(elem['Day']).isAfter(this.state.dateTime, 'day')){
                count = 10;
            }
            if(moment(elem['Day']).isSame(this.state.dateTime, 'day')){
                let hour = this.state.dateTime.hour();
                let minute = this.state.dateTime.minute();
                count = elem['Hour_minute_count'][hour][minute];
                if(count <= 0){
                    count = 10;
                }
            }
        });
        return count;
    };

    createBubbleChart() {
        const dataForChart = this.state.data;
        const getCount = this.getCount;
        const node = this.node;
        const radiusScale = d3.scale.pow()
            .exponent(0.5)
            .domain([0,800])
            .range([1,90]);

        d3.select(node)
            .selectAll('circle')
            .data(dataForChart)
            .enter()
            .append('circle')
            .on('mouseover', this.props.onHover)
            .on('mouseout', this.props.noHover)
            .on('click', d => this.props.onClick(d));

       /* d3.select(node)
            .selectAll('circle')
            .data(dataForChart)
            .exit()
            .remove();*/

        d3.select(node)
            .selectAll('circle')
            .attr("fill", d => {return this.fillCircle(d)})
            .attr('opacity', d => this.props.hoverElement === d.AP_id ? 0.9 : 0.7)
            .attr('r', d => {
                const count = getCount(d);
                return radiusScale(count);
            })
            .attr('cx', d => {return this.setCircleX(d.AP_id)})
            .attr('cy', d => {return this.setCircleY(d.AP_id)})
            .each(pulse);

        function pulse() {
            const circle = d3.select(node).selectAll("circle");
            (function repeat() {
                circle.transition()
                    .duration(1500)
                    .attr("stroke-width", 20)
                    .attr("r", d => {
                        const count = getCount(d);
                        return radiusScale(count);
                    })
                    .transition()
                    .duration(1500)
                    .attr('stroke-width', 0.5)
                    .attr("r", d => {
                        const count = getCount(d);
                        return radiusScale(count) + 30;
                    })
                    .ease('sine')
                    .each("end", repeat);
            })();
        }
    }

    fillCircle(d){
        const count = this.getCount(d);
        if (count < 70) {
            return "skyblue";
        }
        else if (count < 200) {
            return "green";
        }
        else if (count < 400) {
            return "gold";
        }
        else {
            return "red";
        }
    }

    setCircleX(AP_id){
        if(AP_id === "lib"){
            return 667;
        }
        if(AP_id === "ctlg1"){
            return 835;
        }
        if(AP_id === "ctlg5"){
            return 838;
        }
        if(AP_id === "ctlg7"){
            return 1015;
        }
        if(AP_id === "hall"){
            return 1172;
        }
        if(AP_id === "nor"){
            return 207;
        }
        if(AP_id === "sou"){
            return 545;
        }
        return -1
    };

    setCircleY(AP_id){
        if(AP_id === "lib"){
            return 165;
        }
        if(AP_id === "ctlg1"){
            return 590;
        }
        if(AP_id === "ctlg5"){
            return 165;
        }
        if(AP_id === "ctlg7"){
            return 165;
        }
        if(AP_id === "hall"){
            return 540;
        }
        if(AP_id === "nor"){
            return 140;
        }
        if(AP_id === "sou"){
            return 630;
        }
        return -1
    };

    render() {
        return <div>
                <svg ref={node => this.node = node}
                     width={this.props.size[0]} height={this.props.size[1]}>
                    <image href={background} height="100%" width="100%"/>
                </svg>
                </div>
    }
}

export default BubbleChart;