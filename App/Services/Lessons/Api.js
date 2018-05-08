import apisauce from 'apisauce'
import { omitBy, isNil } from 'lodash'
import { API_URL } from '../../Config/Constants'

const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json; charset=utf-8'
    },
    timeout: 10000
  })

  const lessonsGetList = (token = null,
                          ownerUserId = null,
                          limit = 1000,
                          /*
                           status = [
                           'draft',
                           'accepted',
                           'archived',
                           'deleted'
                           ],
                           */
                          accessTags = [
                            'free',
                            'collaborators',
                            'blackbelt',
                            'champions'
                          ],
                          include = [
                            'author',
                            'category',
                            'course',
                            'progresses',
                            'favorites',
                            'ratings',
                            'trainings',
                            'difficulty'
                          ],) => {
    const reqData = {
      token: token,
      limit: limit,
      status: null,
      access_tags: null,
      include: include
    }
    return api.post('/api/v1/commands/execute/Lesson.list', omitBy(reqData, isNil))
  }
  const lessonGetById = (lessonId = null, token = null, include = [
    'author',
    'category',
    'course',
    'progresses',
    'favorites',
    'ratings',
    'trainings',
    'difficulty'
  ]) => {
    const reqData = {
      lesson_id: lessonId,
      include: include,
      token: token,
    }
    return api.post('/api/v1/commands/execute/Lesson.getById ', omitBy(reqData, isNil))
  }

  const lessonSetFavoriteFlag = (lessonId = 0, flag = 'toggle', token = null) => {
    const reqData = {
      action: flag,
      lesson_id: lessonId,
      token: token,
    }
    return api.post('/api/v1/commands/execute/Lesson.setFavoriteFlag', omitBy(reqData, isNil))
  }
  const lessonCreateTraining = (lessonId = 0, token = null) => {
    const reqData = {
      lesson_id: lessonId,
      token: token,
    }
    return api.post('/api/v1/commands/execute/Lesson.createTraining', omitBy(reqData, isNil))
  }

  const lessonSetRating = (lessonId = null, score = null, comment = null, token = null) => {
    const reqData = {
      lesson_id: lessonId,
      score: score,
      comment: comment,
      token: token,
    }
    return api.post('/api/v1/commands/execute/Lesson.setRating', omitBy(reqData, isNil))
  }

  return {
    lessonsGetList,
    lessonGetById,
    lessonSetFavoriteFlag,
    lessonSetRating,
    lessonCreateTraining
    /*
     getCategoryList,
     getMaterialsList,
     getLessonsList,
     lessonSetFavoriteFlag,
     lessonCreateTraining,
     lessonCloseTraining,
     lessonSetRating,
     getTrainingsList,
     getTrainingById,
     trainingSendMessage,
     trainingSendVideoForScore
     */
  }
}

export default {
  create
}
