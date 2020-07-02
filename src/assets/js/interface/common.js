export default {

    //获取图文列表
    'news.getContentList': {
        url: '/contentmanage/content/getContentList/0',
        type: 'GET',
        params: [
            {
                name: 'contentType',
                type: 'Integer',
                required: true
            }
        ]
    }
}
