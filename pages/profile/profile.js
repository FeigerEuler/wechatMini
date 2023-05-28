// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openId:"",
      avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZnG62cq5Ixk6IvfPIs7zQwk4BFwvvIrhapiaecUxCZ7rkwia1gic3VZUyxcd9hE2FvsGkl4VLmvoYg/132",
      isChargeMB:true,
      chargeAmount:1,

      paramsOrigin: {
        "mchNo":'8565262001',
        "appOrderNo": (new Date()).getTime(),
        "userId":"111111111",
        "clientName":"测试",
        "orderTitle":"话费充值",
        "goodDesp":"中国移动全国手机号均可充值，及时到账",
        "timestamp":(new Date()).getTime(),
        "totalAmount":"0.01",
        "paymentDetail":[
          {"amount":"2000","typeCn":"住宿费"},
          {"amount":"3000","typeCn":"学费"}
        ],
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app = getApp()
    console.log(app.globalData)
  },
 chargeMB(){
   this.setData({isChargeMB:true})
 },
 increaseMB(){
   this.data.chargeAmount+=1;
   this.setData({chargeAmount:this.data.chargeAmount})
   wx.showToast({
    title: '请理性消费',
    icon: 'none',
    duration: 500
  })
 },
 genParams(){
  var _totalAmount =this.data.chargeAmount/100;
  const params = Object.assign(this.data.paramsOrigin, {
    totalAmount:_totalAmount,
    "paymentDetail":[
      {"amount":this.data.chargeAmount,"typeCn":"马币"},
    ]
 })
  this.goCashier(params);
},
 goCashier(params){
  
  wx.request({
    url: `https://mhf4188.tech:18443/api/order/test/generateToken/wechatApp?jsonStr=${encodeURIComponent(JSON.stringify(params))}`, 
    method: 'POST',
    success (res) {
      console.log('generateToken/wechat res:',res.data)
      if(res.data.code === 200){
        const querydata = getQueryData(res.data.result)
        const {token, mchNo,bizId} = querydata;}
      }})
      wx.navigateToMiniProgram({
        appId: 'wx8b50ba8121d86b53',
        path: 'pages/ecobillcashier/ecobillcashier?token=123&mchNo=8565262001&domainName=https://mhf4188.tech:18443&biziId=ecoBill-wechat',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
      
 },
 allPosts(){
  this.setData({isChargeMB:false})
  var posts=[
    {"id":1,"userName":"丁蜂","text":"天气不错","likes":6,"comments":1,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00" },
    {"id":2,"userName":"Musk","text":"今天下雨","likes":2,"comments":1,"createTime":"2022-12-08 15:00","updateTime":"2022-12-08 15:00"}
  ]
  this.setData({posts})

 },
  getInfos(e){
    var _this = this;
     wx.getUserProfile({
      desc:"完善头像",
       success:(e)=>{
       var app = getApp()
       app.globalData.avatarUrl=e.userInfo.avatarUrl
       _this.setData({avatarUrl:e.userInfo.avatarUrl})
       console.log(app.globalData)
      

       wx.login({
        success: res => {
          console.log("res",res)
          var jsCode=res.code;
          var avatar = this.data.avatarUrl
          wx.request({
            url: `http://mhf4188.tech:8088/api/login`,
            method: 'POST',
            data:{'code':jsCode,'avatarUrl':avatar},
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
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      },
       fail(e){console.log("111",e)}
    });
    
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