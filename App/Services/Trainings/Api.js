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
  const trainingClose = (trainingId = 0, ignoreMark = null, token = null) => {
    const reqData = {
      training_id: trainingId,
      ignore_mark: ignoreMark,
      token: token
    }
    return api.post('/api/v1/commands/execute/Training.close', omitBy(reqData, isNil))
  }
  const difficultyList = () => {
    return api.post('/api/v1/commands/execute/Difficulty.list', {})
  }
  const trainingList = (studentUserId = null,
                        teacherUserId = null,
                        token = null,
                        include = [
                          'student',
                          'teacher',
                          'course',
                          'lesson',
                          'mark_reason_message',
                          'mark_message',
                          'messages'
                        ],
                        trainingStatus = null,
                        offset = null,
                        limit = 999) => {
    const reqData = {
      student_user_id: studentUserId,
      teacher_user_id: teacherUserId,
      include: include,
      status: trainingStatus,
      offset: offset,
      limit: limit,
      token: token
    }
    return api.post('/api/v1/commands/execute/Training.list', omitBy(reqData, isNil))
  }

  const trainingGetById = (trainingId = null,
                           token = null,
                           include = [
                             'student',
                             'teacher',
                             'course',
                             'lesson',
                             'mark_reason_message',
                             'mark_message',
                             'messages'
                           ],) => {
    const reqData = {
      training_id: trainingId,
      include: include,
      token: token
    }
    return api.post('/api/v1/commands/execute/Training.getById', omitBy(reqData, isNil))
  }
  const trainingSendMessage = (trainingId, text = null, token = null) => {
    const reqData = {
      training_id: trainingId,
      text: text,
      token: token,
    }
    return api.post('/api/v1/commands/execute/Training.sendMessage', omitBy(reqData, isNil))
  }
  const trainingScoreVideo = (trainingId, replyMessageId = null, text = null, mark, token = null) => {
    const reqData = {
      training_id: trainingId,
      set_mark: mark,
      reply_for_message_id: replyMessageId,
      text: text,
      token: token
    }
    return api.post('/api/v1/commands/execute/Training.sendMessage', omitBy(reqData, isNil))
  }
  const trainingSubmittingVideoForEvaluation = (trainingId, attachmentId = null, token = null, text = null) => {
    const reqData = {
      training_id: trainingId,
      attachment_id: attachmentId,
      token: token,
      text: text,
      for_mark: true
    }
    return api.post('/api/v1/commands/execute/Training.sendMessage', omitBy(reqData, isNil))
  }
  return {
    trainingList,
    trainingClose,
    difficultyList,
    trainingGetById,
    trainingSendMessage,
    trainingSubmittingVideoForEvaluation,
    trainingScoreVideo
  }
}

export default {
  create
}
