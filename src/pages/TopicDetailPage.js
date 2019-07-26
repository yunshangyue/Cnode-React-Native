import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, ScrollView, RefreshControl, TouchableWithoutFeedback} from 'react-native'
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx'
import {WebView} from 'react-native-webview';
import {COMMON_COLOR, HTMLCODE, SCRIPTCODE} from '../common/base'
import {Toast, Provider} from "@ant-design/react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationUtil from "../util/NavigationUtil";

@inject('store')
@observer
export default class TopicDetailPage extends Component {
    constructor(props) {
        super(props)
        this.store = this.props.store.topicDetailStore
        this.topicId = this.props.navigation.state.params.id
    }

    componentDidMount() {
        this.reLoadData()
    }

    componentWillUnmount() {
        this.store.content = {}
        this.store.webviewHeight = 0

    }

    reLoadData() {
        this.store.getTopicDetailData(this.topicId).then(e => {
            Toast.offline(e)
        })
    }

    toComment(comment) {
        NavigationUtil.goPage(comment, 'CommentPage')
    }

    star() {
        this.store.topicCollect(this.topicId)
    }

    render() {
        let content = this.store.content
        let isCollect = this.store.isCollect
        if (content.NetworkError) { // 请求完成 网络出错
            return (
                <Provider>
                    <View style={{alignItems: 'center', justifyContent: 'center', height: 500}}>
                        <Text onPress={() => this.reLoadData()}>点击重试</Text>
                    </View>
                </Provider>

            )
        }

        if (!content.content) { // 请求未完成
            return (
                <View>
                    <Text>数据加载中...</Text>
                </View>
            )
        }

        return ( // 请求成功
            <View style={{width: '100%', height: '100%', paddingBottom: 60, backgroundColor: '000'}}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={content.isLoading}
                        titleColor={COMMON_COLOR}
                        colors={[COMMON_COLOR]}
                        onRefresh={() => this.reLoadData()}
                    />
                }>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{content.title}</Text>
                    </View>
                    <View style={{height: 10, backgroundColor: '#ebebeb'}}></View>
                    <View style={styles.authorContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: content.author.avatar_url}} style={styles.authorAvatar}/>
                            <Text style={styles.loginname}>{content.author.loginname}</Text>
                        </View>
                    </View>
                    <View style={styles.content_container}>
                        <WebView
                            onMessage={event => {
                                this.store.webviewHeight = event.nativeEvent.data
                            }}
                            originWhitelist={"*"}
                            source={{html: HTMLCODE(content.content)}}
                            style={{height: parseInt(this.store.webviewHeight)}}/>
                    </View>
                </ScrollView>
                <View style={styles.comment_container}>
                    <TouchableWithoutFeedback onPress={() => this.toComment()}>
                        <View style={[styles.icon_container, {}]}>
                            <MaterialCommunityIcons color={COMMON_COLOR} name={'comment-text-multiple-outline'}
                                                    size={30}/>
                            <Text style={styles.icon_label}>{content.reply_count}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.star()}>
                        <View style={styles.icon_container}>
                            <MaterialIcon color={COMMON_COLOR} name={isCollect ? "star" : "star-border"} size={30}/>
                            <Text style={styles.icon_label}>{isCollect ? '已收藏' : '收藏'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    titleContainer: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        color: '#333'
    },
    authorContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 10
    },
    authorAvatar: {
        width: 35,
        height: 35
    },
    loginname: {
        marginLeft: 10
    },
    content_container: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
    },
    comment_container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexGrow: 1,
        flexDirection: 'row'
    },
    icon_label: {
        color: COMMON_COLOR
    },
    icon_container: {
        alignItems: 'center',
        flex: 1
    }
})