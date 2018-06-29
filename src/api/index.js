import fetch from '@/utils/fetch'
// api地址需要在微信后台配置： 设置->开发设置->服务器域名
const urlPrefix = 'https://m.douban.com'
const urlIntro = 'https://frodo.douban.com'
const apikey = '054022eaeae0b00e0fc068c0c0a2102a&appid=wx2f9b06c1de1ccfca'

export function getFilm (params) {
  // 获取近期上映， 热门电影， 电视剧， 综艺
  return fetch({
    url: `${urlPrefix}/rexxar/api/v2/subject_collection/${params.listApi}/items`,
    data: params.data
  })
}

export function getFilmDetail (params) {
  // 详情
  return fetch({
    url: `${urlPrefix}/rexxar/api/v2/movie/${params.id}`,
    data: params.data
  })
}

export function getShortComment (params) {
  // 短评
  return fetch({
    url: `${urlIntro}/api/v2/movie/${params.id}/interests?count=5&apikey=${apikey}`,
    data: params.data
  })
}

export function getFilmComment (params) {
  // 影评
  return fetch({
    url: `${urlIntro}/api/v2/movie/${params.id}/reviews?count=3&apikey=${apikey}`,
    data: params.data
  })
}
