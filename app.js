//app.js
const config = require("./appKey.js");

App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    wx.BaaS.init(config.appKey);

    wx.BaaS.auth.loginWithWechat().then(res => {
      // login is successful.
      if (res.is_authorized) {
        // the user is logged in previously, we can save the user info.
        wx.setStorageSync('userInfo', res);
      }
    }, err => {
      console.log('initial login attempt fail', err);
    });

    wx.getLocation({
      type: 'gcj-02',
      success: (res) => {
        console.log('after get location success', res)
      },
      fail: (err) => {
        console.log('after get location fail', err);
      }
    })

    const deviceInfo = wx.getSystemInfoSync();

    this.data.platform = deviceInfo.platform;

  },
  globalData: {
    platform: '',
  },
});
