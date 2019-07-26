import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation'
import StartPage from '../pages/StartPage'
import HomePage from '../pages/HomePage'
import TopicDetailPage from '../pages/TopicDetailPage'
import CommentPage from '../pages/Comment'


const initNavigator = createStackNavigator({
    StartPage: {
        screen: StartPage,
        navigationOptions: {
            header: null
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    TopicDetailPage: {
        screen: TopicDetailPage
    },
    CommentPage: {
        screen: CommentPage
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        Init: initNavigator,
        Main: MainNavigator
    }, {
        navigationOptions: {
            header: null
        }
    }))