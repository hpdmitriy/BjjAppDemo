import React from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import base64 from 'base-64'
import {
  isUndefined,
  isNull,
  filter,
  find,
  mean,
  compact,
  map,
  escapeRegExp,
  kebabCase,
  isEmpty,
  indexOf,
  uniqBy,
  isString,
  assignIn,
  transform,
  isEqual,
  isObject,
  toLower
} from 'lodash'
import { IMAGES_PATH, MEDIA_PATH, API_URL } from '../Config/Constants'

function difference (object, base) {
  const returnCondition = typeof object === 'object' && !isEmpty(object) && !isEmpty(base)

  function changes (object, base) {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value
      }
    })
  }

  return returnCondition ? changes(object, base) : isEmpty(base) && !isEmpty(object) ? object : null
}

function showResult (response, title = 'Response', ctx) {
  ctx.refs.container.scrollTo({x: 0, y: 0, animated: true})
  if (response.ok) {
    ctx.refs.result.setState({message: FJSON.plain(response.data), title: title})
  } else {
    ctx.refs.result.setState({message: `${response.problem} - ${response.status}`, title: title})
  }
}

class APIResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: false,
      title: false
    }
  }

  onApiPress = () => {
    this.setState({message: false})
  }

  renderView () {
    return (
      <ScrollView style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}} overflow='hidden'>
        <TouchableOpacity
          style={{backgroundColor: 'white', padding: 20}}
          onPress={this.onApiPress}
        >
          <Text>{this.state.title} Response:</Text>
          <Text allowFontScaling={false} style={{fontFamily: 'CourierNewPS-BoldMT', fontSize: 10}}>
            {this.state.message}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render () {
    let messageView = null
    if (this.state.message) {
      return this.renderView()
    }

    return messageView
  }
}

function debugDisplay (preview, value) {
  if (__DEV__ && console.tron) {
    console.tron.display({
      name: '🔥DEBUGG🔥',
      preview: preview,
      value: {
        value
      }
    })
  } else {
    console.log(preview, value)
  }
}

function decodeToken (param = 'all', token) {
  const inToken = JSON.parse(base64.decode(token.split('.')[1]))
  return param !== 'all' ? inToken[param] : inToken
}

function mergePhoneNo (country, phoneNo) {
  return country.split(' ')[1].slice(1, -1) + phoneNo
}

function applyLetterSpacing (string, count = 1) {
  return string.split('').join('\u200A'.repeat(count))
}

function formatDate (date) {
  const dayMilisec = 86400000
  const thisMoment = moment().format('x')
  const pubDateMoment = moment(date).format('x')
  return thisMoment - pubDateMoment <= dayMilisec ? moment(date).startOf('day').fromNow() : moment(date).format('MMM Do YY')
}
function formatMessageDate (date, format) {
  return moment(date).format(format)
}

function addMainImg (attachments = null, last = false) {
  if (isNull(attachments)) {
    return `${IMAGES_PATH}demo.png`
  }
  const filtredAttachments = filter(attachments, (attach) => ~attach.mime_type.indexOf('image'))
  const attachmentsLength = filtredAttachments.length
  if (attachmentsLength && attachmentsLength > 1 && last) {
    return filtredAttachments[attachmentsLength - 1].url
  } else {
    return filtredAttachments.length ? filtredAttachments[0].url : `${IMAGES_PATH}demo.png`
  }

}

function lessonStatus (progress = [], id) {
  if (!progress.length) {
    return 0
  }
  const findId = find(progress, (item) => item.resource_id === id)
  if (!findId) {
    return 0
  }
  const status = findId.progress
  switch (true) {
    case status === 0:
      return 1
    case status > 0 && status < 100:
      return 2
    case status === 100:
      return 3
    default:
      return 0
  }
}

function calcLessonRating (rating, id) {
  if (!rating.length) {
    return 0
  }
  return mean(compact(map(rating, (rate) => rate.resource_id === id ? rate.score : null)))
}

function chekPrevVoted (ratings, uid) {
  const result = find(ratings, (rating) => rating.owner_user_id === uid)
  return !isEmpty(result)
}

function checkIsFavorites (favorites, userId, lessonId) {
  if (!favorites.length) {
    return 0
  }
  const result = find(
    favorites, (fvr) =>
    fvr.resource_id === lessonId && fvr.owner_user_id === userId
  )
  return isUndefined(result) ? 0 : 1
}

function findLessonData (lessons, id) {
  const result = find(
    lessons, (lesson) =>
    lesson.id === id
  )
  return result
}

function favoriteFilter (arr, uid) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let lesson = arr[i]
    if (lesson.favorites.length) {
      let favoriteList = filter(lesson.favorites, (o) => o.owner_user_id === uid)
      if (favoriteList.length) {
        result.push(lesson)
      }
    }
  }
  return result
}

function quickSearch (enterArr, keyword = null, categoryId = [], uniq = false, favorites = 0) {
  let arr = enterArr
  let result = null
  if (uniq) {
    arr = uniqBy(arr, 'category_id')
  }
  if (keyword) {
    const regex = new RegExp(escapeRegExp(keyword), 'i')
    result = filter(arr, (obj) => regex.test(obj.title))
  }
  if (!isEmpty(categoryId)) {
    result = isNull(result) ? filter(arr, (obj) => indexOf(categoryId, obj.category_id) >= 0) : filter(result, (obj) => indexOf(categoryId, obj.category_id) >= 0)
  }
  if (favorites !== 0) {
    result = favoriteFilter(result, favorites)
  }

  return isNull(result) ? arr : result
}

function findCategoryIcon (name, mimeType, path = MEDIA_PATH) {
  return `${path}${kebabCase(name)}.${mimeType}`
}
/*

 ['not started', 'lightgrey'],
 ['awaiting', 'fire'],
 ['during', 'blue'],
 ['done', 'green']

 */
function trainingStatus (trainings, sid, lid, getId = false) {
  let currentLessonTraining
  if (Array.isArray(trainings)) {
    currentLessonTraining = filter(trainings, (o) => o.student_user_id === sid && o.lesson_id === lid)
    if (isEmpty(currentLessonTraining)) {
      return 'NOT_STARTED'
    }
    currentLessonTraining = currentLessonTraining.length > 1 ? filter(currentLessonTraining, (o) => o.training_status !== 'closed')[0] : currentLessonTraining[0]
  } else {
    currentLessonTraining = {training_status:trainings}
  }

  if (getId) {
    return currentLessonTraining.id
  }
  switch (currentLessonTraining.training_status) {
    case null:
      return 'STARTED'
      break
    case 'no_teachers':
      return 'NO_TEACHERS'
      break
    case 'waiting_teacher_mark':
      return 'AWAITING'
      break
    case 'marked':
      return 'MARKED'
      break
    case 'closed':
      return 'DENIED'
      break
    case 'completed':
      return 'DONE'
      break
    default:
      return 'STARTED'
      break
  }
}

async function fetchApiData (/*ctx, */command, params) {
  try {
    const response = await fetch(`${API_URL}/api/v1/commands/execute/${command}`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        ...params
      })
    })
    const responseJson = await response.json()
    //ctx.setState({asyncData: responseJson});
    return responseJson

  } catch (error) {
    console.log(error)
  }
}
async function getCategoryIcon (id) {
  try {
    const response = await fetch(`${MEDIA_PATH}category_icon_id_${id}.png`)
    let responseJson = await response.json()
    //ctx.setState({asyncData: responseJson});
    debugger
    return responseJson.ok ? `${MEDIA_PATH}category_icon_id_${id}.png` : `${MEDIA_PATH}category_icon_default.png`

  } catch (error) {
    console.log(error)
    return `${MEDIA_PATH}category_icon_default.png`
  }
}

async function fetchTempData (command, params) {
  try {
    const response = await fetch(`${API_URL}/api/v1/commands/execute/${command}`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        ...params
      })
    })
    const responseJson = await response.json()
    this.setState({asyncData: responseJson.rows})
  } catch (error) {
    console.log(error)
  }
}
function getVideosIds (attachments) {
  let videos = []
  if (!attachments.length) {
    return videos
  }
  for (let i = 0; i < attachments.length; i++) {
    let attach = attachments[i]
    if (attach.mime_type.slice(0, 5) === 'video') {
      let videoUrl = attach.url
      if (~videoUrl.indexOf('youtu.be') || ~videoUrl.indexOf('youtube.com')) {
        const videoId = videoUrl.split('/')
        videos.push(videoId[videoId.length - 1])
      }
    }
  }
  return videos
}
function findMarkVideoId (markReason) {
  if (isNull(markReason)) {
    return null
  }
  return !!~markReason.text.lastIndexOf('trainingVideo::') ? markReason.text.slice(15) : null
}

function returnResError (res) {
  const {data, problem} = res
  if (!isNull(data) && !isUndefined(data.error)) {
    return data.error
  } else if (!isNull(problem)) {
    return problem
  } else {
    return 'Unknown Error'
  }
}

function getItemsFromProps (operate, props, key) {
  const resultKeys = new Set(['fetching', 'downloading', 'success', 'fetched'])
  let assignProps = {}
  let resultProps = false
  operate.forEach((item) => {
    const propsItem = props[item][key]
    //const propsItem = props[item][key] || props[item][`${key}s`]
    if (resultKeys.has(key)) {
      resultProps = propsItem === null ? false : propsItem
    } else assignIn(assignProps, propsItem)
  })
  return resultKeys.has(key) ? resultProps : assignProps
}

function filterDataByTags (tags, data) {
  if (Array.isArray(tags) && Array.isArray(data) && data.length && tags.length) {
    let result = []
    data.forEach((item) => {
      const itemAccessTags = item.access_tags
      itemAccessTags.forEach((tag) => {
        if (!!~tags.indexOf(tag)) {
          result.push(item)
        }
      })
    })
    return result
  } else {
    return data
  }
}

function filterDataByTarif (paidTags, data, role) {
  switch (toLower(role)) {
    case 'student':
      return filterDataByTags(paidTags, data)
      break
    default:
      return data
      break
  }
}
function getMinTariff (tags) {
  if (!!~tags.indexOf('champions')) {
    return 5
  }
  if (!!~tags.indexOf('blackbelt')) {
    return 3
  }
  if (!!~tags.indexOf('collaborators')) {
    return 2
  }
  if (!!~tags.indexOf('free')) {
    return 1
  }

}

function restrictContentByTariff (user = null, accessTags = []) {
  if (isNull(user) || isEmpty(accessTags) || toLower(user.userProfile.role) !== 'student') {
    return '0'
  } else {
    const activeTariff = find(user.userAvailableTariffs, (t) => t.id === user.userProfile.tariff_id)
    for (let tag of activeTariff.options.paid_tags) {
      if (!!~accessTags.indexOf(tag)) {
        return '0'
        break
      } else {
        return getMinTariff(accessTags)
      }
    }

  }
}

export {
  findCategoryIcon,
  quickSearch,
  formatDate,
  showResult,
  APIResult,
  debugDisplay,
  applyLetterSpacing,
  decodeToken,
  mergePhoneNo,
  addMainImg,
  lessonStatus,
  calcLessonRating,
  checkIsFavorites,
  findLessonData,
  fetchApiData,
  fetchTempData,
  trainingStatus,
  favoriteFilter,
  getVideosIds,
  chekPrevVoted,
  formatMessageDate,
  findMarkVideoId,
  difference,
  returnResError,
  getItemsFromProps,
  getCategoryIcon,
  filterDataByTarif,
  restrictContentByTariff
}
