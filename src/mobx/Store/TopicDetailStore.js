import {action, observable} from 'mobx'
import {BASE_URL, accesstoken} from '../../common/base'
import {HttpGet, HttpPost} from '../../util/FetchUtil'

class TopicDetailStore {
    @observable
    content = {isLoading: false}

    @observable
    webviewHeight = 0

    @observable
    isCollect = false

    @action
    async getTopicDetailData(id) {
        this.content.isLoading = true
        this.content.NetworkError = false
        try {
            let res = await HttpGet(`${BASE_URL}/topic/${id}?accesstoken=${accesstoken}`)
            if (res.success && res.data) {
                console.log(res.data)
                this.content = {...res.data, isLoading: false}
                this.isCollect = res.data.is_collect
            }
        } catch (e) {
            console.log(e)
            this.content = {isLoading: false, NetworkError: true}
            return '网络出错'
        }
    }

    @action
    async topicCollect(topic_id) {
        console.log(accesstoken, topic_id)
        try {
            if (this.isCollect) {
                let res = await HttpPost(`${BASE_URL}/topic_collect/de_collect`, {
                    topic_id,
                    accesstoken
                })
                console.log(res)
                if (res.success) {
                    this.isCollect = false
                }
            } else {
                let res = await HttpPost(`${BASE_URL}/topic_collect/collect`, {
                    topic_id,
                    accesstoken
                })
                console.log(res)
                if (res.success) {
                    this.isCollect = true
                }
            }
        } catch (e) {
            console.log(e)
        }


    }
}

let topicDetailStore = new TopicDetailStore()

export {topicDetailStore}