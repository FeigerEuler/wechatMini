// pages/postDetails/postDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   // detail:{"id":1,"userName":"丁蜂","text":"天气不错","likes":6,"comments":1,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"},
    commentInfos:[
      {userName:"张三",avatarSrc:"",createTime:"",commentText:""}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(111)
    var _detail=JSON.parse(options.a) 
   this.setData({detail:_detail})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})