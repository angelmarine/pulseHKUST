import React from 'react'
import MovementDate from "../Pane/MovementDate";
import moment from "moment/moment";
import MovementChord from '../Graph/MovementChord';
import guide from '../../img/guide-round.svg';

class MovementTab extends React.Component{

    constructor(props){
        super(props);
        // used in ThemeriverDate component
        this.floorDateTime = this.floorDateTime.bind(this);
        this.setDateTime = this.setDateTime.bind(this);
        this.setDatePickerPaneActive = this.setDatePickerPaneActive.bind(this);
        this.state = {
            // for this + child components
            //dateTime: this.floorDateTime(moment()),
            dateTime: this.floorDateTime(moment("2018-03-09 17:00")),
            // used in ThemeriverDate component
            isDatePickerPaneActive: false,
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
    }

    setDatePickerPaneActive(active){
        this.setState({
            isDatePickerPaneActive: active
        })
    };

    render(){
        return(
            <div id='three'>
                <MovementDate
                    dateTime={moment(this.state.dateTime)}
                    setDateTime = {this.setDateTime}
                    setDatePickerPaneActive = {this.setDatePickerPaneActive}
                    isDatePickerPaneActive = {this.state.isDatePickerPaneActive}
                    pageWrapId='chord'
                    outerContainerId='three'/>
                <div id='chord' style={{'width':'50%', 'position': 'fixed', 'top':'8%', 'left': '25%'}}>
                    <MovementChord
                        dateTime={moment(this.state.dateTime)}
                        />
                </div>
                <div>
                    <img src={guide} hspace="60px" align="right" height="550px" width="400px" />
            </div>
            </div>
        )

    }
}
export default MovementTab