import React, { Component } from 'react'
import '../styles/app.css'
import MainTab from './Tab/MainTab.js'


class App extends Component {
    render() {
        return (
            <div className='App' id='App'>
                <MainTab/>
            </div>
        )
    }
}

export default App;
