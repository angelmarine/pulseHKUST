import React from 'react'
import { push as Menu } from 'react-burger-menu'
import { paneStyle, displayStyle} from './styles/DateRangePaneStyle.js'
import { DateRange } from 'react-date-range'
import image from './img/select-range.svg'
import moment from "moment/moment";

class DateRangePane extends React.Component {

    constructor(props){
        super(props);
        this.setStartEndDate = this.setStartEndDate.bind(this);
        this.setDateRangePaneActive = this.setDateRangePaneActive.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            isDateRangePaneActive: this.props.isDateRangePaneActive
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isDateRangePaneActive: nextProps.isDateRangePaneActive
        });
    }

    setStartEndDate(startDate, endDate){
        this.props.setStartEndDate(startDate, endDate);
    }

    setDateRangePaneActive(active){
        this.setState({
           isDateRangePaneActive: active
        });
        this.props.setDateRangePaneActive(active)
    }

    handleSelect(range){
        if(range['startDate'] === range['endDate']){
        }
        else{
            this.setStartEndDate(range['startDate'], range['endDate'])
        }
    }

    onStateChange(pane){
        this.setDateRangePaneActive(pane.isOpen);
    };

    render () {
        return (
            <Menu right
                  noOverlay
                  customBurgerIcon={<img src={image} alt="Select Date / Time"/>}
                  styles={paneStyle}
                  onStateChange={this.onStateChange}
                  isOpen={this.state.isDateRangePaneActive}
                  width={650}
                  pageWrapId={ this.props.pageWrapId }
                  outerContainerId={ this.props.outerContainerId}>
                <div style={{height:'15%'}}>
                </div>
                <div>
                    <form>
                        <div className="input">
                            <input type="text" style={displayStyle} value={this.props.startDate.format('Do MMMM YYYY')} readOnly />
                            <input type="text" style={displayStyle} value={this.props.endDate.format('Do MMMM YYYY')} readOnly />
                        </div>
                        <DateRange
                            date={moment(this.props.endDate)}
                            onChange={this.handleSelect}
                            theme={{
                                DateRange      : {
                                    background   : '#ffffff'
                                },
                                Calendar       : {
                                    background   : 'transparent',
                                    color        : '#95a5a6',
                                },
                                MonthAndYear   : {
                                    background   : '#1385e5',
                                    color        : '#ffffff'
                                },
                                MonthButton    : {
                                    background   : '#1385e5'
                                },
                                MonthArrowPrev : {
                                    borderRightColor : '#ffffff',
                                },
                                MonthArrowNext : {
                                    borderLeftColor : '#ffffff',
                                },
                                Weekday        : {
                                    background   : '#1385e5',
                                    color        : '#ffffff'
                                },
                                Day            : {
                                    transition   : 'transform .1s ease, box-shadow .1s ease, background .1s ease'
                                },
                                DaySelected    : {
                                    background   : '#ba62a8'
                                },
                                DayActive    : {
                                    background   : '#d376c0',
                                    boxShadow    : 'none'
                                },
                                DayInRange     : {
                                    background   : '#ea91d8',
                                    color        : '#fff'
                                },
                                DayHover       : {
                                    background   : '#ffffff',
                                    color        : '#7f8c8d',
                                    transform    : 'scale(1.1) translateY(-10%)',
                                    boxShadow    : '0 2px 4px rgba(0, 0, 0, 0.4)'
                                }
                            }}/>
                    </form>
                </div>
            </Menu>
        );
    }
}

export default DateRangePane;