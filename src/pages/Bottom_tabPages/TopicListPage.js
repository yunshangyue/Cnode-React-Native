import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import NavigationUtil from "../../util/NavigationUtil";
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation'
import {inject, observer} from 'mobx-react'
import {toJS} from 'mobx'
import TopicListItem from '../../common/TopicListItem'
import {COMMON_COLOR} from '../../common/base'
import {Provider, Toast} from "@ant-design/react-native";

export default class TopicListPage extends Component {
    constructor(props) {
        super(props)
        this.tabList = ['ask', 'share', 'job', 'good']
    }

    _createTabs() {
        let tabs = {}
        this.tabList.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: prop => <TopicTab {...prop} tabLabel={item}/>,
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs
    }


    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._createTabs(),
            {
                lazy: true,
                tabBarOptions: {
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#fff',
                    },
                    labelStyle: {
                        color: COMMON_COLOR
                    },
                    indicatorStyle: styles.indicatorStyle,
                    pressColor: COMMON_COLOR
                }
            }
        ))
        return <TabNavigator/>

    }
}

@inject('store')
@observer
class TopicTab extends Component {
    constructor(props) {
        super(props)
        this.tabName = this.props.tabLabel
        this.store = this.props.store.topicListStore
    }

    componentDidMount() {
        this.getTopicData()
    }

    getTopicData() {
        this.store.getTopicData(this.tabName).catch(e => Toast.offline('网络出错'))
    }

    render() {
        const TABNAME = this.tabName
        let list = this.store.TopicList[TABNAME]
        if (this.store.NetworkError) {
            return <Provider>
                <View>
                    <Text>网络出错,<Text onPress={() => this.getTopicData()}>点击重试</Text></Text>
                </View>
            </Provider>
        }
        if (list === undefined) {
            return <View styles={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                <ActivityIndicator size="large" color={COMMON_COLOR}/>
            </View>
        }

        return (
            <View style={styles.container}>
                <FlatList data={list.items}
                          renderItem={data => this._renderItem(data)}
                          keyExtractor={item => "" + item.id}
                          refreshControl={
                              <RefreshControl
                                  refreshing={list.isLoading}
                                  title={'正在加载'}
                                  titleColor={COMMON_COLOR}
                                  colors={[COMMON_COLOR]}
                                  onRefresh={() => this.reLoadData()}
                              />
                          }
                          ListFooterComponent={() => this.getLoading()}
                          onEndReached={() => this.loadingMoreData()}
                          onEndReachedThreshold={0.5}
                >
                </FlatList>
            </View>

        )
    }

    _renderItem(data) {
        let item = data.item
        return <TopicListItem item={item}/>
    }

    loadingMoreData() {
        this.store.getMoreData(this.tabName)
    }

    reLoadData() {
        this.getTopicData()
    }

    getLoading() {
        return <View style={{alignItems: 'center'}}>
            <ActivityIndicator style={{color: COMMON_COLOR, margin: 10}} size={'large'}/>
            <Text>加载中...</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    indicatorStyle: {
        height: 3,
        backgroundColor: COMMON_COLOR,

    },
    container:
        {
            backgroundColor: '#f6f6f6'
        }
})