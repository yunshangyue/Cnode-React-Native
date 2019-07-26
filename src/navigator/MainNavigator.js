import React, {Component} from 'react'
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'
import TopicListPage from '../pages/Bottom_tabPages/TopicListPage'
import MyPage from '../pages/Bottom_tabPages/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {COMMON_COLOR} from '../common/base'

const BOTTOMTABS = {
    TopicListPage: {
        screen: TopicListPage,
        navigationOptions: {
            tabBarLabel: "话题",
            tabBarIcon: ({tintColor}) =>
                <MaterialIcons name={'trending-up'} size={30} color={tintColor}/>
        },

    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor}) =>
                <MaterialIcons name={'person'} size={30} color={tintColor}/>
        },

    }
}

export default class MainNavigator extends Component {
    constructor(props) {
        super(props)
    }

    _tabNavigator() {
        return createAppContainer(createBottomTabNavigator(BOTTOMTABS, {
            tabBarOptions: {
                activeTintColor: COMMON_COLOR,
                inactiveTintColor: '#8590a6',
            }
        }))
    }

    render() {
        const Tab = this._tabNavigator()
        return <Tab/>
    }


}