import fetch from '@/utils/fetch'
const urlPrefix = 'https://m.douban.com'

export function getFilm (params) {
  // 获取近期上映， 热门电影， 电视剧， 综艺
  return fetch({
    url: `${urlPrefix}/rexxar/api/v2/subject_collection/${params.listApi}/items`,
    data: params.data
  })
}
