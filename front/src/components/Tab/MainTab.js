import React, { Component } from 'react'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import MapViewTab from "./MapViewTab"
import ThemeriverTab from "./ThemeriverTab"
import MovementTab from "./MovementTab";

class MainTab extends Component {

    render() {
        return (
            <Tabs
                defaultTab="tabOne"
                onChange={(tabId) => { console.log(tabId) }}
            >
                <TabList>
                    <Tab tabFor="tabOne" style={{fontSize:'20px', fontFamily: 'Tahoma, Verdana, Segoe, sans-serif'}}> Map View </Tab>
                    <Tab tabFor="tabTwo" style={{fontSize:'20px', fontFamily: 'Tahoma, Verdana, Segoe, sans-serif'}}> ThemeRiver </Tab>
                    <Tab tabFor="tabThree" style={{fontSize:'20px', fontFamily: 'Tahoma, Verdana, Segoe, sans-serif'}}> Movement Flow </Tab>
                </TabList>
                <TabPanel tabId="tabOne">
                    <MapViewTab/>
                </TabPanel>
                <TabPanel tabId="tabTwo">
                    <ThemeriverTab/>
                </TabPanel>
                <TabPanel tabId="tabThree">
                    <MovementTab/>
                </TabPanel>
            </Tabs>
        );
    }
}

export default MainTab;
