import React, {Component} from 'react'
import {View, Text, BackHandler} from 'react-native'
import NavigationUtil from "../util/NavigationUtil";
import MainNavigator from '../navigator/MainNavigator'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
    }

    onBackPress = () => {
        if (this.props.navigation.state.routeName == 'HomePage') {
            return false
        }
        return true
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <MainNavigator />
    }
}