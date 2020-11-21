const app = getApp();

Page({
  data: {
    items: [],
    scrollInto: "",
    inputVal: "",
    currentLocation: {},
    platform: '',
  },
  onLoad: function () {
    const systemInfo = wx.getSystemInfoSync();

    this.setData({
      platform: systemInfo.platform,
    })
    const Movies = new wx.BaaS.TableObject("movies");

    // Movies.find() returns a Promise
    Movies.find().then(
      (result) => {
        // This is when the promise is RESOLVED (everything ok)
        // console.log("this will happen second.");
        // console.log("result from ifanr", result);
        this.setData({
          items: result.data.objects,
        });
      },
      (error) => {
        // This is when the promise is REJECTED (something wrong happened)
        // console.log("it's an error!!", error);
      }
    );

    // console.log("This will happen first!");
  },
  toMovie: function (e) {
    // console.log('after movie click', e);
    wx.navigateTo({
      // detail?id=fii23fi09r29038r3r290
      url: `detail?id=${e.currentTarget.id}`,
    });
  },
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  formReset: function () {
    const val = this.data.inputVal.trim();

    if (val === "") {
      wx.showToast({
        title: 'Error',
        icon: 'success',
        duration: 2000,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return
    }

    wx.showModal({
      title: "Create Movie?",
      content: `Are you sure you want to create the movie: ${val}`,
      showCancel: true,
      cancelText: "Cancel",
      cancelColor: "#000000",
      confirmText: "Create",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          const Movies = new wx.BaaS.TableObject("movies");

          const newMovie = Movies.create();

          newMovie.set({
            title: val,
          });

          newMovie.save().then((res) => {
            const newItems = this.data.items;

            newItems.push(res.data);

            this.setData({
              items: newItems,
            });
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
  chooseLocation: function () {
    wx.chooseLocation({
      success: (res) => {
        console.log("get location success", res);
      },
    });
  },
});
