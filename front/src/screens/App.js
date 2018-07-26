import React, { Component } from 'react'
import '../styles/app.css'
import MainPageTab from '../components/Tab/MainTab.js'


class App extends Component {
    render() {
        return (
            <div className='App' id='App'>
                <MainPageTab/>
            </div>
        )
    }
}

export default App;
