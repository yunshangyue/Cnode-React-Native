import React, {Component} from 'react'
import AppNavigator from './src/navigator/AppNavigtor'
import {Provider} from 'mobx-react'
import AppStore from './src/mobx/AppStore'

export default class App extends Component {
    render() {
        return (
            <Provider store={AppStore}>
                <AppNavigator/>
            </Provider>
        )
    }

}