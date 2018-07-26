import React from 'react'
import ChordDiagram from 'react-chord-diagram'
import 'whatwg-fetch'
import ReactTooltip from 'react-tooltip'
const R = require('ramda');

class MovementChord extends React.Component{

    constructor(props){
        super(props);
        this.getMatrix =this.getMatrix.bind(this);
        this.loadDefaultMessage = this.loadDefaultMessage.bind(this);
        this.loadFailMessage = this.loadFailMessage.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadChordDiagram = this.loadChordDiagram.bind(this);
        this.state = {
            dateTime: this.props.dateTime,
            data: null,
            order: [],
            loaded: this.loadDefaultMessage()
        }
    }

    componentDidMount() {
        this.loadData(this.state.dateTime)
            .then(() => {
                this.setState({
                    loaded: this.loadChordDiagram()
                });
            }).catch((err) => {
                this.setState({
                    loaded: this.loadFailMessage()
                });
        })
    }

    componentWillReceiveProps(nextProps) {
        // only update the data if the 'day' changes, not the 'time'
        if(!(nextProps.dateTime.isSame(this.props.dateTime, 'day'))){
            this.loadData(nextProps.dateTime);
        }

        this.setState({
            dateTime: nextProps.dateTime
        });

        setTimeout(() => {
            this.setState({loaded:this.loadChordDiagram()})
        }, 2000);
    }

    getMatrix(hour){
        const hourData = R.find(R.propEq('hour', hour))(this.state.data);
        return hourData["matrix"];
    }

    loadDefaultMessage(){
        return <div> Loading... </div>
    }

    loadFailMessage(){
        return <div> Failed to load data ! </div>
    }

    loadData(targetDate){
        // load one day data of all locations using API and store in the 'data' state
        // date should be in YYYY-MM-DD format
        // API will still send data with zero matrix if the data does not exist for that day.
        let url = 'http://127.0.0.1:8888/api/data/matrix/date=' + targetDate.format('YYYY-MM-DD');
        console.log("Sending request to server: " + url);
        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.hasOwnProperty('order') && data.hasOwnProperty('data')){
                    this.setState({
                        order: data['order'],
                        data: data['data']
                    })
                }
            })
            .catch(function(ex) {
                console.log('parsing failed', ex)
            });
    }

    loadChordDiagram(){
        return (<div data-tip data-for='chordTooltips'>
            <ChordDiagram
                matrix={this.getMatrix(this.state.dateTime.hour())}
                style={{fontFamily: 'Tahoma, Verdana, Segoe, sans-serif'}}
                width={700}
                height={700}
                componentId={1}
                groupLabels={this.state.order}
                labelColors={["#0f7e9b", "#ed8217", "#a2eae0", "#e4e0dc", "#f9acbb", "#98b243", "#996881" ]}
                groupColors={["#0f7e9b", "#ed8217", "#a2eae0", "#e4e0dc", "#f9acbb", "#98b243", "#996881" ]}/>
            <ReactTooltip id='chordTooltips' type='dark' effect='float'>
                <p>On hovering over locations,</p>
                <p>movement flow to/from that location will be displayed</p>
            </ReactTooltip>
        </div>)
    }

    render(){
        return (
            <div>
                {this.state.loaded}
            </div>
        )
    }
}

export default MovementChord;