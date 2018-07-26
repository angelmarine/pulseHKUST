import React from 'react'
import Themeriver from '../Graph/Themeriver'
import ThemeriverDate from "../Pane/ThemeriverDate";
import moment from "moment/moment";

class ThemeriverTab extends React.Component{

    constructor(props){
        super(props);
        // used in ThemeriverDate component
        this.setStartEndDate = this.setStartEndDate.bind(this);
        this.setDateRangePaneActive = this.setDateRangePaneActive.bind(this);
        // let now = moment();
        let now = moment("2018-03-09");
        this.state = {
            // for this + child components
            endDate: moment(now),
            startDate: moment(now.subtract(4, 'days')),
            // used in DatePickerPane component
            isDateRangePaneActive: false,
        };
    }


    setStartEndDate(startDate, endDate){
        this.setState({
            startDate: startDate,
            endDate: endDate
        });
        console.log("Selected Date Range: " + startDate.format('YYYY-MM-DD HH:mm') + " ~ " + endDate.format('YYYY-MM-DD HH:mm'));
    }

    setDateRangePaneActive(active){
        this.setState({
            isDateRangePaneActive: active
        })
    };

    render(){
        return(
            <div id='two'>
                <ThemeriverDate
                    startDate={moment(this.state.startDate)}
                    endDate={moment(this.state.endDate)}
                    setStartEndDate = {this.setStartEndDate}
                    setDateRangePaneActive = {this.setDateRangePaneActive}
                    isDateRangePaneActive = {this.state.isDateRangePaneActive}
                    pageWrapId='themeriver'
                    outerContainerId='two'/>
                <div id='themeriver'>
                    <Themeriver
                        startDate={moment(this.state.startDate)}
                        endDate={moment(this.state.endDate)}/>
                </div>
            </div>
        )

    }
}
export default ThemeriverTab