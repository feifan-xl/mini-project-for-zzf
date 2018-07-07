Page({

  /**
   * 页面的初始数据
   */
  data: {
    BaseUrl: '',
    StaticUrl: '',
    imgUrls: [
      {
        code: 1,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        code: 2,
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        code: 3,
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
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
    detailImg: ''
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
      url: 'http://mock.eolinker.com/AICzS9z07adb008c1874783b6a002ae7092ad3027ddbe32?uri=/home/getGoodsList',
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

  },
  buyOne:function(e){
    let me = this
    var id=e.currentTarget.id;    
    this.setData({
      display: "block",
      price: me.data.goodsInfo[id].price,
      name: me.data.goodsInfo[id].name,
      buyAmount: 1,
      remainderCount: me.data.goodsInfo[id].count,
      detailImg: me.data.goodsInfo[id].img
    })
  },

  navSwiper (e) {
    console.log(getApp().globalData)
    console.log(e)
    console.log(e.currentTarget.dataset.code)
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
  }
  
})
