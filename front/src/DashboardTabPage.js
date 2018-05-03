import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import CountBarChart from "./CountBarChart";
import DwellChart from "./DwellChart";
import moment from 'moment';

class DashboardTabPage extends React.Component {
    render(){
        return(
            <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <Tab tabFor="one">Crowd size at different times of the day</Tab>
                    <Tab tabFor="two">Dwelling time at different times of the day</Tab>
                </TabList>
                <TabPanel tabId="one">
                    <CountBarChart dateTime={moment(this.props.dateTime)} clickedElement={this.props.clickedElement}/>
                </TabPanel>
                <TabPanel tabId="two">
                    <DwellChart dateTime={moment(this.props.dateTime)} clickedElement={this.props.clickedElement}/>
                </TabPanel>
            </Tabs>
        )

    }
}

export default DashboardTabPage;