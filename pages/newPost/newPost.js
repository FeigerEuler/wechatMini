// pages/newPost/newPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    openId:''
  },
  onInput(event) {
    this.setData({
      inputValue: event.detail.value
    })
  },
  sendPost(){
    this.setData({
      openId:wx.getStorageSync('openId')
    })
    console.log('data=',this.data)
    setTimeout(()=>{
      console.log(this.data.inputValue)
      if(''===this.data.inputValue){
        wx.showToast({
          title: "请输入内容后分享",
          icon: 'none',
          duration: 2000
        })
        return;
      }
      
      wx.request({
        url: `http://mhf4188.tech:8088/api/newPost`,
        method: 'POST',
        data:this.data,
        success (res1) {console.log(`ok:`,res1)},
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


  }
    ,200);
    
    

  },
/*
()->{
      
    }
    },500
*/
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