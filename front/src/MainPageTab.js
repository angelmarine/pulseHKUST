import React, { Component } from 'react'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import MainPageTabOne from "./MainPageTabOne"
import MainPageTabTwo from "./MainPageTabTwo"
import MainPageTabThree from "./MainPageTabThree";

class MainPageTab extends Component {

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
                    <MainPageTabOne/>
                </TabPanel>
                <TabPanel tabId="tabTwo">
                    <MainPageTabTwo/>
                </TabPanel>
                <TabPanel tabId="tabThree">
                    <MainPageTabThree/>
                </TabPanel>
            </Tabs>
        );
    }
}

export default MainPageTab;
