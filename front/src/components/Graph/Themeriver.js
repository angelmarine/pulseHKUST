import React from 'react';
import StreamGraph from './StreamGraph';
import StreamLegend from './StreamLegend';
import 'whatwg-fetch'
import moment from "moment/moment";

class Themeriver extends React.Component{

    constructor(props){
        super(props);
        // Bind the this context to the orderChangeHandler function
        this.dataChangeHandler = this.dataChangeHandler.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadDefaultMessage = this.loadDefaultMessage.bind(this);
        this.loadStreamGraph = this.loadStreamGraph.bind(this);

        this.state = {
            // at first, show only 1 week data.
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            data: null,
            loaded: this.loadDefaultMessage()
        };
    }

    componentDidMount() {
        this.loadData(this.state.startDate, this.state.endDate);
        setTimeout(() => {
            this.setState({
                loaded: this.loadStreamGraph()
            })
        }, 1000);
    }

   componentWillReceiveProps(nextProps) {
        if(nextProps.startDate === this.props.startDate  && nextProps.endDate === this.props.endDate){
        }
        else{
            this.setState({
                startDate: nextProps.startDate,
                endDate: nextProps.endDate,
            });
            this.loadData(nextProps.startDate, nextProps.endDate);
            setTimeout(() => {
                this.setState({
                    loaded: this.loadStreamGraph()
                })
            }, 1000);
        }
   }


    // This method will be sent to the child component
    dataChangeHandler(newData) {
        this.setState({
            data: newData
        });
        setTimeout(() => {
            this.setState({
                loaded: this.loadStreamGraph()
            })
        }, 1000);
    }

    loadDefaultMessage(){
        return <div> Loading... </div>
    }

    loadData(targetStartDate, targetEndDate){
        //const colorrange = ["#FEF0D9", "#FDD49E", "#FDBB84", "#FC8D59", "#E34A33", "#B30000", "#4d0000" ];
        const colorrange = ["#0f7e9b", "#ed8217", "#a2eae0", "#e4e0dc", "#f9acbb", "#98b243", "#996881" ];

        // load data in the range of start date and end date
        // date should be in YYYY-MM-DD format
        let url = 'http://127.0.0.1:8888/api/data/stream/from=' + targetStartDate.format('YYYY-MM-DD') + "&to=" + targetEndDate.format('YYYY-MM-DD');
        console.log("Sending request to server: " + url);
        return fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
               const mappedData = data['data'].map((elem, index) => {
                    elem['frequency'] = elem['frequency'].map(innerEl => {innerEl['x'] = new Date(innerEl['x']); return innerEl;});
                    elem['color'] = colorrange[index];
                    elem['display_status'] = true;
                    return elem;
                });
                this.setState({
                    data: mappedData
                })
            })
            .catch(function(ex) {
                console.log('parsing failed', ex)
            });
    }

    loadStreamGraph(){
        return <div>
                <StreamGraph
                    data={this.state.data}
                    startDate={moment(this.state.startDate)}
                    endDate={moment(this.state.endDate)}
                    onChange={this.dataChangeHandler} />
                <StreamLegend data={this.state.data} onChange={this.dataChangeHandler}/>
                </div>
    }

    render(){
        return(
            <div>
                {this.state.loaded}
            </div>
        )
    }
}

export default Themeriver;

