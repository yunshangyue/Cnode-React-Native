import {action, observable} from 'mobx'
import {BASE_URL} from '../../common/base'
import {HttpGet} from '../../util/FetchUtil'

class TopicListStore {
    @observable TopicList = {}

    @observable NetworkError = false

    @action
    async getTopicData(tabName) {
        this.NetworkError = false
        try {
            const TABNAME = tabName
            let result = await HttpGet(`${BASE_URL}/topics?tab=${tabName}&page=1&mdrender=false&limit=10`)
            this.TopicList[TABNAME] = {items: result.data, isLoading: false, page: 1}
        } catch (e) {
            this.NetworkError = true
            this.TopicList = {}
            throw new Error('网络出错')
        }
    }

    @action
    async getMoreData(tabName) {
        try {
            const TABNAME = tabName
            this.TopicList[TABNAME].page += 1
            let res = await fetch(`${BASE_URL}/topics?tab=${tabName}&page=${this.TopicList[TABNAME].page}&mdrender=false&limit=10`)
            let result = await res.json()
            this.TopicList[TABNAME].items = [...this.TopicList[TABNAME].items, ...result.data]
        } catch (e) {
        }
    }

    @action
    async reLoadData(tabName) {
        const TABNAME = tabName
        this.TopicList[TABNAME].isLoading = true
        let res = await fetch(`${BASE_URL}/topics?tab=${tabName}&page=1&mdrender=false`)
        let result = await res.json()
        this.TopicList[TABNAME] = {items: result.data, isLoading: false, page: 1}

    }
}

let topicListStore = new TopicListStore()

export {topicListStore}