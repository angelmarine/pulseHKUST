import React from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import DashboardTabPage from "./DashboardTabPage";
import moment from 'moment';

const abbrFor = {
    nor: 'North Bus Station',
    sou: 'South Bus Station',
    ctlg1: 'LG1 Canteen',
    ctlg5: 'LG5 Canteen',
    ctlg7: 'LG7 Canteen',
    lib: 'Library',
    hall:'Student Hall'
};

class DashboardPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: this.props.dateTime,
            clickedElement: this.props.clickedElement,
            isDashboardPaneActive: this.props.isDashboardPaneActive
        };
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.clickedElement === nextProps.clickedElement
            && this.props.isDashboardPaneActive === nextProps.isDashboardPaneActive){
        }
        else{
            this.setState({
                dateTime: nextProps.dateTime,
                clickedElement: nextProps.clickedElement,
                isDashboardPaneActive: nextProps.isDashboardPaneActive
            })
        }

    }

    render() {
        return <div ref={ref => this.el = ref}>
            <SlidingPane
                className='statistics-pane'
                overlayClassName='some-custom-overlay-class'
                isOpen={this.state.isDashboardPaneActive}
                title= {'Statistics For: ' + abbrFor[this.state.clickedElement] + " at " + this.state.dateTime.format("YYYY-MM-DD")}
                width='800px'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.props.onClose();
                }}>
                <DashboardTabPage
                    clickedElement = {this.state.clickedElement}
                    dateTime = {moment(this.state.dateTime)}/>
            </SlidingPane>
        </div>;
    }
}

export default DashboardPane;