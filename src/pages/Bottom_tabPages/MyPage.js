import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Modal} from 'react-native'
import {Button, Provider, Toast} from '@ant-design/react-native'

export default class MyPage extends Component {
    render() {
        return (
            <Provider>
                <View>
                    <Text>123</Text>
                    <Button type='primary' onPress={() => Toast.info('this is Toast')}>Button</Button>
                </View>
            </Provider>

        )
    }
}