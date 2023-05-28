// components/posts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {type:Boolean,vaule:false},
    postsDetails:{type:Array,vaule:[
    ]}
    
  },

  /**
   * 组件的初始数据
   */
 
  data: {
    
    posts: {
      "postsDetail":[
  
      ],
    }
  },
  lifetimes: {
    attached: function() {
      setTimeout(()=>{
        var cData=this.data.posts;
      cData.postsDetail=this.properties.postsDetails;//先修改json值
      this.setData({ //再set值
        posts:cData
     })
       },1000
      )
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

    clickLikeBt(e){
     
      var cData=this.data.posts;
      cData.postsDetail[e.target.id].likes=1;
      
      this.setData({ //再set值
        posts:cData
     })
    },
    clickCommentBt(e){
      var a= this.data.posts.postsDetail[e.target.id];
      wx.navigateTo({ //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
        url: '/pages/postDetails/postDetails?a='+JSON.stringify(a)//此处注意中文符号与引文符号的？
      })
  }
}
})
