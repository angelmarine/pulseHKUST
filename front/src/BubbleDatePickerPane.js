import './styles/input-moment.css'
import { push as Menu } from 'react-burger-menu'
import React from 'react'
import {displayStyle, paneStyle} from './styles/DatePickerPaneStyle.js'
import InputMoment from 'input-moment'
import image from './img/select-datetime.svg'

class BubbleDatePickerPane extends React.Component {

    constructor(props){
        super(props);
        // for internal use
        this.setDateTime = this.setDateTime.bind(this);
        this.setDatePickerPaneActive = this.setDatePickerPaneActive.bind(this);

        // for Menu Component
        this.onStateChange = this.onStateChange.bind(this);

        // for InputMoment component
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            isDatePickerPaneActive: this.props.isDatePickerPaneActive
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isDatePickerPaneActive: nextProps.isDatePickerPaneActive
        });
    }

    setDateTime(dateTime){
        this.props.setDateTime(dateTime);
    }

    setDatePickerPaneActive(active){
        this.setState({
            isDatePickerPaneActive: active
        });
        this.props.setDatePickerPaneActive(active)
    }

    handleChange(m){
        this.setDateTime(m);
    }

    handleSave(){
        this.setDatePickerPaneActive(false);
    }

    onStateChange(pane){
        this.setDatePickerPaneActive(pane.isOpen);
    };

    render () {
        return (
            <Menu right
                  noOverlay
                  customBurgerIcon={<img src={image} alt="Select Date / Time"/>}
                  styles={paneStyle}
                  onStateChange={this.onStateChange}
                  isOpen={this.state.isDatePickerPaneActive}
                  width={430}
                  pageWrapId={ this.props.pageWrapId }
                  outerContainerId={ this.props.outerContainerId}>
                <div className="app">
                    <form>
                        <div className="input">
                            <input type="text" style={displayStyle} value={this.props.dateTime.format('Do MMMM YYYY, HH:mm')} readOnly />
                        </div>
                        <InputMoment
                            moment={this.props.dateTime}
                            onChange={this.handleChange}
                            minStep={10}
                            onSave={this.handleSave}
                        />
                    </form>
                </div>
            </Menu>
        );
    }
}

export default BubbleDatePickerPane;