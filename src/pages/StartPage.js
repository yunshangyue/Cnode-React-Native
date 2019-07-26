import React, {Component} from 'react'
import {View, Text} from 'react-native'
import NavigationUtil from '../util/NavigationUtil'

export default class StartPage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHome({
                navigation: this.props.navigation
            })
        }, 200)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <View>
                <Text>StartPage</Text>
            </View>
        )
    }
}