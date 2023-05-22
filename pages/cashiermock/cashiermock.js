// pages/test/test.js
import { DOMAIN } from "../../components/ecobillcashier/index/ecobillcashier.js";



/**
 * 
 * @param {string} url  "https://eco-bill.uat.cibfintech.com/wechat/?token=111&mchNo=222&bizId=333&callbackUrl=444"
 * @returns  {token: "111", mchNo: "222", bizId: "333", callbackUrl: "444"}
 */
const getQueryData = (url) =>{
  return decodeURI(url).split('?')[1].split('&')
  .map(param => param.split('='))
  .reduce((values, [ key, value ]) => {
    values[ key ] = value
    return values
  }, {})
}

// const APP_ID = 'wx8feca4df112153bc'; // 公众号
// const APP_ID = 'wx8ed79877addded44'; // bdx
const APP_ID = 'wx1f87d44db95cba7a'; // 小程序
// const APP_ID = 'wx246ca1eb5007c486'; // 兴e家


const MCH_NO = "8565262001"; // 常用
// const MCH_NO = "lingshou-zhsquat"; // 兴e家

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    paramsOrigin: {
      "subAppId": APP_ID,
      "subOpenId": null,
      "mchNo":MCH_NO,
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
  onLoad: function (options) {

  },
  goCashierFew(){
    const params = {
      "clientName":"测试客户",
      "paymentDetail":[
        {"amount":"2000","typeCn":"住宿费"},
        {"amount":"3000","typeCn":"学费"}
      ],
    }
    this.goCashier(this.data.paramsOrigin);
  },

  goCashierMany(){
    const params = Object.assign(this.data.paramsOrigin, {
      "clientName":"非常多费用的大客户大商家",
      "paymentDetail":[
       
        {"amount":"30003000300030003000","typeCn":"学费学费学费学费学费学费学费学费学费学费"},
 
      ]
      
    })
    this.goCashier(params);

  },

  goCashier(params){
    this.setData({loading: true});
    const _self = this;
    wx.request({
      url: `${DOMAIN}/api/order/test/generateToken/wechatApp?jsonStr=${encodeURIComponent(JSON.stringify(params))}`, 
      method: 'POST',
      success (res) {
        console.log('generateToken/wechat res:',res.data)
        if(res.data.code === 200){
          const querydata = getQueryData(res.data.result)
          const {token, mchNo,bizId} = querydata;
          wx.navigateTo({
            url: `/pages/cashierdemo/cashierdemo?token=${token}&mchNo=${mchNo}&bizId=${bizId}`,
          })
        }else{
          const msg = `${res.data.msg || '系统错误'}`;
          wx.showToast({
            title: msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail(error){
        console.log('generateToken/wechat error:',error)
        const msg = `系统异常`;
        wx.showToast({
          title: msg,
          icon: 'error',
          duration: 2000
        })
      },
      complete(){
        _self.setData({loading: false})
      }
    })
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

  }
})