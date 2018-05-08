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

  const getEventList = (token = null,
                        limit = 50,
                        include = ['category', 'author', 'resource_entity'],
                        accessTags = [
                          'free',
                          'collaborators',
                          'blackbelt',
                          'champions'
                        ]) => {
    const reqData = {
      token: token,
      limit: limit,
      include: include,
      //access_tags: accessTags,
    }
    return api.post('/api/v1/commands/execute/Event.list', omitBy(reqData, isNil))
  }
  const eventGetById = (id = null,
                        token = null,
                        include = ['category', 'author', 'resource_entity']) => {
    const reqData = {
      event_id: id,
      token: token,
      include: include
    }
    return api.post('/api/v1/commands/execute/Event.getById', omitBy(reqData, isNil))
  }
  return {
    getEventList,
    eventGetById
  }
}
export default {
  create
}
