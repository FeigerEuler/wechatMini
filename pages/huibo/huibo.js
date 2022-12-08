// pages/huibo/huibo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    my:"hello",
    posts: {
      "subAppId": 123, 
      "postsDetail":[
        {"id":"1","userName":"mhh","text":"天气不错","createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"},
        {"id":"2","userName":"Musk","text":"今天下雨","createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"}
      ],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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