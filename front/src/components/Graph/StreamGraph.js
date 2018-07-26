import React from "react";
import { withFauxDOM } from 'react-faux-dom';
import '../../styles/streamgraph.css'
const d3 = require('d3');
const R = require('ramda');

class StreamGraph extends React.Component{
    constructor(props) {
        super(props);
        this.renderD3 = this.renderD3.bind(this);
        this.updateD3 = this.updateD3.bind(this);
        this.momentToDate = this.momentToDate.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    componentDidMount (){
        this.renderD3()
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps.data !== this.props.data){
            this.updateD3()
        }
    }

    momentToDate(moment){
        return moment.toDate();
    }

    handleOrderChange(theme) {
        let newData = R.clone(this.props.data);
        for(let i = 0; i < newData.length; i++){
            if(newData[i]["theme"] === theme){
                let newFirst = newData[i];
                newData[i] = newData[0];
                newData[0] = newFirst;
            }
        }

        this.props.onChange(newData);
    }

    renderD3() {
        const mydata = this.props.data;
        const handleChange = theme => this.handleOrderChange(theme);

        let faux = this.props.connectFauxDOM('div', 'chart');
        let margin = {top: 50, right: 20, bottom: 200, left: 100},
            width = 1200 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

        let x = d3.time.scale();
        let y = d3.scale.linear()
            .rangeRound([height, 0]);

        let xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format('%d %b %H:%M'));

        let yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        let dataset = mydata.filter(function(d){
            if(d["display_status"]){
                return d;
            }
        });

        if(dataset.length === 0) {
            return;
        }

        let svg = d3.select(faux).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) {return d.frequency;});

        let layers = stack(dataset);

        x.domain([this.momentToDate(this.props.startDate), this.momentToDate(this.props.endDate)]).range([0, width]);
        y.domain([0, d3.max(layers[layers.length - 1]["frequency"], function(d) { return d.y0 + d.y; })]).nice();

        let area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d) { return x(d.x); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); });

        svg.selectAll(".layer")
            .data(layers)
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", function(d) { return area(d["frequency"]); })
            .style("fill", function(d) {  return d.color; })
            .attr("class", function(d){return d.theme;})
            .on("click", function(d) {handleChange(d.theme)});

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(6,0)")
            .call(yAxis)
            .selectAll("text")
            .attr("y", -8)
            .attr("x", -50)
            .attr("dy", "1em")
            .attr("transform", "rotate(0)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height  + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", -20)
            .attr("x", 9)
            .attr("dy", "1em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

    }

    updateD3() {
        let faux = this.props.connectFauxDOM('div', 'chart');
        d3.select(faux).selectAll("svg").remove();
        this.props.animateFauxDOM(800);
        this.renderD3();
    }

    render () {
        return (
            <div className="streamGraph ib">
                {this.props.chart}
            </div>
        )
    }
}

StreamGraph.defaultProps = {
    chart: 'loading...'
};

const FauxChart = withFauxDOM(StreamGraph);

export default FauxChart;
