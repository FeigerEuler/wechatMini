// pages/huibo/huibo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    my:"hello",
    posts: [
      /*{"id":1,"userName":"丁蜂","content":"天气不错","likes":6,"comments":1,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00" },
    {"id":2,"userName":"Musk","content":"今天下雨","likes":2,"comments":1,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"},
    {"id":3,"userName":"罗安庚","content":"今天和好兄弟约游戏, 美滋滋","likes":6,"comments":7,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"},
    {"id":4,"userName":"Tony","content":"我是腾讯老总","likes":6,"comments":1,"createTime":"2022-12-09 12:00","updateTime":"2022-12-09 15:00"}
*/
      ],
    
  },

/*
  clickLikeBt(e){
    var cData=this.data.posts;
    cData.postsDetail[e.target.id].likes+=1;//先修改json值
    this.setData({ //再set值
      posts:cData
   })
  },
  clickCommentBt(e){
    var a= this.data.posts.postsDetail[e.target.id];
    wx.navigateTo({ //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
      url: '/pages/postDetails/postDetails?a='+JSON.stringify(a)//此处注意中文符号与引文符号的？
    })
  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    wx.request({
      url: `http://mhf4188.tech:8088/api/getAllPosts`,
      method: 'POST',
      data:{},
      success (res1) {
        
        _this.setData({
          posts:res1.data.data
        })
        console.log(`getAllPosts:`,_this.data)
    },
      fail(res1){
            console.log(`error:`,res1)
            const msg = `系统异常`;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          },   
       } ) 
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
    var _this = this
    wx.request({
      url: `http://mhf4188.tech:8088/api/getAllPosts`,
      method: 'POST',
      data:{},
      success (res1) {
        
        _this.setData({
          posts:res1.data.data
        })
        console.log(`getAllPosts:`,_this.data)
    },
      fail(res1){
            console.log(`error:`,res1)
            const msg = `系统异常`;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          },   
       } ) 
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