// components/ecobillcashier/ecobillcashier.js
// export const DOMAIN = 'https://eco-bill.sit.cibfintech.com';
export const DOMAIN = 'https://eco-bill.uat.cibfintech.com';

const CHANNEL = {
  wechat: {
    value: 'WECHAT',
    label: '微信支付',
    logo: 'wechat_logo.jpg'
  },
  cibpay: {
    value: 'CARDPAY',
    label: '收付直通车',
    logo: 'cib_logo.jpg'
  }
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mchNo:{
      type: String,
      value: ''
    },
    bizId:{
      type: String,
      value: ''
    },
    token:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
   data: {
    // 订单信息
    orderDetail: {},
    // 详情展开或隐藏
    isShowDetail: false,
    loading: false,
    // 拉起支付
    subAppId: '',
    jwttoken: '', // jwt
    // 显示内容
    isShowCashier: true,
    // 通道选择
    channelList: [],
    selectedChannel: CHANNEL.cibpay.value,
    // cibpay 
    webviewUrl: '',
    limitCibCard: '',
  },  

  lifetimes: {
    attached: function() {
      setTimeout(()=>{
        // 在组件实例进入页面节点树时执行
        const _self = this;
        const {mchNo, bizId, token} = this.data;
        console.log(`mchNo: `, this.data);
        wx.request({
          url: `${DOMAIN}/api/order/createMobileOrder`,
          method: 'POST',
          header: {token}, // test token
          data:{mchNo, bizId},
          success (res) {
            console.log('createMobileOrder res:',res.data);
            if(res.data.code === 200){
              const {subAppId, 
                appOrderNo,clientName,
                paymentDetail,totalAmount,
                payChannelDetails
              } = res.data.result;
              const jwttoken = res.data.result.token;
              _self.setData({subAppId, jwttoken});
              _self.setData({
                orderDetail:{
                  appOrderNo, // 业务订单号
                  clientName, // 姓名(可能没有)
                  paymentDetail, // 缴费项目明细  {序号，费用类型 typeCn，金额(元) amount}
                  totalAmount, // 合计待支付金额
                }
              });
              
              // 根据字段判断支付通道
              const outTypes = payChannelDetails.map(d=>{
                const outType = d.outType;
                if(outType === CHANNEL.cibpay.value){
                  _self.setData({
                    limitCibCard: d.limitCibCard
                  })
                }
                return outType
              });    
              const curChannelList = [];
              if(outTypes.includes(CHANNEL.wechat.value)){ // 微信支付
                curChannelList.push(CHANNEL.wechat);
              }
              if(outTypes.includes(CHANNEL.cibpay.value)){ // 直通车
                curChannelList.push(CHANNEL.cibpay);
              }
              _self.setData({
                channelList: curChannelList
              })

            }else{
              console.log(`not 200...`)
              const msg = `${res.data.msg || '系统错误'}`;
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail(e){
            console.log(`error:`,e)
            const msg = `系统异常`;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          },
        })
      })
    },
  },



  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e){
      console.log(`radioChange...`,e)
      this.setData({
        selectedChannel: e.detail.value
      });
    },
    
    toggleDetail(){
      const cur = this.data.isShowDetail;
      this.setData({
        isShowDetail: !cur
      })
    },  

    goback(){
      wx.navigateBack()
    },

    startPay(){
      console.log(`startPay...`,this.data.selectedChannel);
      switch (this.data.selectedChannel) {
        case CHANNEL.wechat.value:
          this.goWechat();
          break;
        case CHANNEL.cibpay.value:
            this.goCibPay();
            break;
        default:
          break;
      }
    },
    
    goCibPay(){
      console.log(`goCibPay...`)
      const _self = this;
      _self.setData({loading: true})
      const {mchNo} = _self.data;
      wx.request({
        url: `${DOMAIN}/api/order/create/acquire`,
        method: 'POST',
        header: {token: _self.data.jwttoken}, // jwt token
        data:{mchNo},
        success (res) {
          console.log(`res: `, res);
          const {code,msg} =  res.data;
          if(code === 200){
            const {orderNo, userId, totalAmount} = res.data.result;
            const querystr = `mchNo=${mchNo}&userId=${userId}&orderNo=${orderNo}&totalAmount=${totalAmount}&jwttoken=${_self.data.jwttoken}&limitCibCard=${_self.data.limitCibCard}`;   
            const url = `${DOMAIN}/cibpay/cashier/quick?${querystr}`;      
            console.log(`进入支付页: `,url);
            _self.setData({
              isShowCashier: false,
              webviewUrl: url,
            });
          }else if(code === 1015){
            const querystr = `mchNo=${mchNo}&jwttoken=${_self.data.jwttoken}&limitCibCard=${_self.data.limitCibCard}`;
            const url = `${DOMAIN}/cibpay/card/type?${querystr}`; 
            console.log(`进入绑卡页: `,url);     
            _self.setData({
              isShowCashier: false,
              webviewUrl: url
            });
          }else{
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(e) {
          console.log(`faile:`,e)
          wx.showToast({
              title: '系统错误',
              icon: 'none',
              duration: 2000
          })
        },
        complete(){
          _self.setData({loading: false})
        }
      })

    },
    
    goWechat(){
      const _self = this;
      _self.setData({loading: true})
      const {subAppId, mchNo} = this.data;
      wx.request({
        url: `${DOMAIN}/api/order/payment/wechat`,
        method: 'POST',
        header: {token: _self.data.jwttoken}, // jwt token
        data:{subAppId, mchNo},
        success (res) {
          console.log('payment/wechat res:',res.data);
          if(res.data.code === 200){
            const payInfo = JSON.parse(res.data.result.payInfo);
            console.log(`payInfo:`, payInfo)
            wx.requestPayment({
              timeStamp: payInfo.timeStamp,
              nonceStr: payInfo.nonceStr,
              package: payInfo.package,
              signType: payInfo.signType,
              paySign: payInfo.paySign,
              success:function(res){
                console.log(`wx pay success: `, res);
                wx.showToast({
                  title: '支付成功!',
                  icon: 'none',
                  duration: 2000
                })
                _self.goback();
              },
              fail:function(res){
                console.log(`wx pay fail: `, res);
                const errmsg = JSON.stringify(res);
                if (errmsg.search("cancel") === -1){
                  wx.showToast({
                    title: `支付失败: ${errmsg}`,
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              complete:function(res){
                console.log(`wx pay complete: `, res);
              }
            })
          }else{ 
            console.log(`not 200...`)
            const msg = `${res.data.msg || '系统错误'}`;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(e){  
          console.log(`error:`,e)
          const msg = `系统异常`;
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        },
        complete(){
          _self.setData({loading: false})
        }
      })
    }, 
    
  }
})
