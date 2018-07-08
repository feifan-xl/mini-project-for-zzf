
Page({
    data: {
        code: "",
        num: ""
    },
    onLoad (options) {
        this.setData({
            code: options.code,
            num: options.num
        })
    }
})