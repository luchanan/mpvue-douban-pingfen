export default function fetch (params = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method || 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (data, statusCode, header) {
        resolve(data)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
