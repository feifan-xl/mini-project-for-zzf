Page({

  /**
   * 页面的初始数据
   */
  data: {
    BaseUrl: '',
    StaticUrl: '',
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    display: "none",
    buyAmount:1,
    minusStatus:"disabled",
    remainderCount: 1,
    name: '',
    goodsInfo: [],
    detailImg: '',
    selectedCode: ''
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      BaseUrl: getApp().globalData.BaseUrl,
      StaticUrl: getApp().globalData.StaticUrl
    })
    this.initSwiper()
    this.initInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  this.creatNumber();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  initInfo () {
    let me = this
    wx.request({
      url: me.data.BaseUrl + '/home/getGoodsList',
      data: {

      },
      success (res) {
        if (res.data) {
          if (res.data.code === 1) {
            let data = res.data.data
            me.setData({
              goodsInfo: data
            })
          }
        }
      },
      fail (err) {
        console.log(err)
      }
    })
  },

  initSwiper () {
    let me = this
    wx.request({
      url: me.data.BaseUrl + '/home/getSwiperList',
      data: {

      },
      success (res) {
        if (res.data) {
          if (res.data.code === 1) {
            let data = res.data.data
            me.setData({
              imgUrls: data
            })
          }
        }
      }
    })
  },

  buyOne:function(e){
    let me = this
    let id = e.currentTarget.id
    this.setData({
      display: "block",
      price: me.data.goodsInfo[id].price,
      name: me.data.goodsInfo[id].name,
      buyAmount: 1,
      remainderCount: me.data.goodsInfo[id].count,
      detailImg: me.data.goodsInfo[id].img,
      selectedCode: me.data.goodsInfo[id].code
    })
  },

  navSwiper (e) {
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: `../detail/index?id=${code}`
    })
  },

  closeBuy:function(){
    this.setData({
      display:"none"
    })
  },

  addAmount:function(){
    var num = this.data.buyAmount;
    num++;
    var minusStatus = num <= 1 ? "disabled" : "normal";
    this.setData({
      buyAmount: num,
      minusStatus: minusStatus
    })
  },

  minusAmount:function(){
    var num = this.data.buyAmount;
    if(num>1){
      num--
    }
    var minusStatus = num<=1?"disabled":"normal";
    this.setData({
      buyAmount:num,
      minusStatus:minusStatus
    })
  },

  goPay () {
    let num = this.data.buyAmount
    let code = this.data.selectedCode
    wx.navigateTo({
      url: `../prepay/prepay?code=${code}&num=${num}`
    })
  },

  addCar () {
    let me = this
    let num = this.data.buyAmount
    let code = this.data.selectedCode
    wx.request({
      url: me.data.BaseUrl + '/home/addToCar',
      data: {
        num: num,
        code: code
      },
      success (res) {
        if (res.data) {
          if (res.data.code === 1) {
            // 添加成功 ，弹出对话框
            me.setData({
              display: "none"
            })
          }
        }
      },
      fail (err) {
        console.log(err)
        // 弹框 失败
      }
    })
  }
})
