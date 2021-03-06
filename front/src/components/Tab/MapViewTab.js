import React from'react'
import MapBubble from '../Graph/MapBubble.js'
import MapDate from '../Pane/MapDate'
import Dashboard from '../Pane/Dashboard'
import 'whatwg-fetch'
import moment from "moment/moment"

class MapViewTab extends React.Component{

    constructor(props){
        super(props);
        // used in this component only
        this.floorDateTime = this.floorDateTime.bind(this);

        // used in DatePickerPane component
        this.setDateTime = this.setDateTime.bind(this);
        this.setDatePickerPaneActive = this.setDatePickerPaneActive.bind(this);

        // used in Dashboard component
        this.onClose = this.onClose.bind(this);
        this.setDashboardPaneActive = this.setDashboardPaneActive.bind(this);

        // used in MapBubble component
        this.onClick = this.onClick.bind(this);
        this.onHover = this.onHover.bind(this);
        this.noHover = this.noHover.bind(this);

        this.state = {
            // for this + child components
            // dateTime: this.floorDateTime(moment()),
            dateTime: this.floorDateTime(moment("2018-03-09 17:00")),

            // used in Dashboard component
            isDashboardPaneActive: false,
            clickedElement: "none", //AP_group of the clicked location

            // used in DatePickerPane component
            isDatePickerPaneActive: false,

            // used in MapBubble component
            hover: "none"
        };

    }

    floorDateTime(now){
        const ROUNDING = 10 * 60 * 1000; /*ms*/
        return moment(Math.floor((+now) / ROUNDING) * ROUNDING);
        //return moment(Math.floor((+now) / ROUNDING) * ROUNDING).format('YYYY-MM-DD HH:mm'); // returns string value, not moment object
    };

    setDateTime(dateTime){
        this.setState({
            dateTime: dateTime
        });
        console.log("Selected Date / Time: " + dateTime.format('YYYY-MM-DD HH:mm'));
    }

    setDashboardPaneActive(active){
        this.setState({
            isDashboardPaneActive: active
        })
    };

    onClick(d){
        this.setDashboardPaneActive(true);
        this.setState({
            clickedElement: d.AP_id
        })
    };

    setDatePickerPaneActive(active){
        this.setState({
            isDatePickerPaneActive: active
        })
    };

    onClose(){
        this.setDashboardPaneActive(false);
        this.setState({
            clickedElement: "none"
        })
    };

    onHover(d){
        this.setState({
            hover: d.AP_id
        })
    }

    noHover(){
        this.setState({
            hover: "none"
        })
    }

    render(){
        return(
            <div id='one'>
                <Dashboard
                    dateTime={moment(this.state.dateTime)}
                    onClose = {this.onClose}
                    isDashboardPaneActive = {this.state.isDashboardPaneActive}
                    clickedElement={this.state.clickedElement}
                />
                <MapDate
                    dateTime={moment(this.state.dateTime)}
                    setDateTime = {this.setDateTime}
                    setDatePickerPaneActive = {this.setDatePickerPaneActive}
                    isDatePickerPaneActive = {this.state.isDatePickerPaneActive}
                    pageWrapId='bubble'
                    outerContainerId='one'/>
                <div id='bubble'>
                        <MapBubble
                            dateTime={moment(this.state.dateTime)}
                            size={[1500,800]}
                            hoverElement = {this.state.hover}
                            onHover = {this.onHover}
                            noHover = {this.noHover}
                            onClick = {this.onClick}/>
                </div>
            </div>
        )
    }

}

export default MapViewTab;