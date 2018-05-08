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

  const techniquesGetCategoryList = (token = null, entityName = 'Technique') => {
    const reqData = {
      entity_name: entityName,
      token: token
    }
    return api.post('/api/v1/commands/execute/Category.list', omitBy(reqData, isNil))
  }

  const getMaterialsList = (token = null,
                            limit = 1000,
                            status = null,
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
                              'category',
                              'favorites',
                              'ratings'
                            ]) => {
    const reqData = {
      token: token,
      limit: limit,
      status: status,
      access_tags: null,
      include: include

    }

    return api.post('/api/v1/commands/execute/Material.list', omitBy(reqData, isNil))
  }
  const materialGetById = (id = null,
                           token = null,
                           include = [
                             'category',
                             'favorites',
                             'ratings'
                           ]) => {
    const reqData = {
      material_id: id,
      token: token,
      include: include
    }
    return api.post('/api/v1/commands/execute/Material.getById', omitBy(reqData, isNil))
  }

  return {
    techniquesGetCategoryList,
  }
}

export default {
  create
}
