import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import NavigationUtil from '../util/NavigationUtil'

export default class TopicListItem extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {item} = this.props
        if (!item) return null
        return (
            <TouchableOpacity onPress={() => this.toDetailPage(item.id, item.title)}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.main}>
                        <View style={styles.author_container}>
                            <Image source={{uri: item.author.avatar_url}} style={styles.author_img}/>
                            <Text>{item.author.loginname}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text>{item.reply_count}</Text>
                            <Text>回复</Text>
                        </View>
                    </View>
                    <View style={styles.content_container}>
                        <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    toDetailPage(id, title) {
        NavigationUtil.goPage({id, title}, 'TopicDetailPage')
    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 3,
        elevation: 2,
        marginTop: 5,
        marginBottom: 5,
    },
    main: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    title: {
        fontSize: 20,
        color: '#000',
        lineHeight: 25
    },
    author_img: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    author_container: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    content_container: {
        marginBottom: 10
    },
    content: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 16,

    }
})