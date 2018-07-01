//index.js
//获取全局应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/swiper01.jpg',
      '/images/swiper02.jpg',
      '/images/swiper03.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null
  },
  onLoad: function () {
    this.getProList ()
  },
  toDetails: function (e) {
    const index = e.currentTarget.dataset.index
    console.log(e, index)
    const title = this.data.proList[index].title
    /*页面传值也可以使用 url传值 
    * url: '/pages/details/details?title=' + title
    */
    /*本地缓存 */
    wx.setStorageSync('title', title)
    wx.navigateTo({
      url: '/pages/details/details'
    })
  },
  getProList: function () {
    wx.request({
      url: `${app.globalData.host}/getWXProList`, /*能够获取全局变量, 也能设置*/
      method: 'GET',
      success: res => {
        this.setData({
          proList: res.data.body
        })
      }
    })
  },
  copy: function () {
    if (wx.setClipboardData) {
      wx.setClipboardData({
        data: '复制的内容',
        success: function (res) {
          wx.showModal({
            title: '复制成功',
            content: `已经复制成功`
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你的微信版本太低， 请升级',
      })
    }
  }
})
