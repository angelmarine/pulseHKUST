import React, { Component } from 'react'
import './styles/App.css'
import MainPageTab from './MainPageTab.js'


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
