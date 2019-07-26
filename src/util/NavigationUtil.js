/**
 * 全局导航工具类
 */
export default class NavigationUtil {
    // 重置到首页
    static resetToHome(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }

    // 返回上一页
    static goBack(navigation) {
        navigation.goBack();
    }

    //跳转到指定页面
    /*
     * @params 要传递的参数
     * @page 要跳转到的页面
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            return;
        }
        navigation.navigate(page, {
            ...params
        });
    }
}
