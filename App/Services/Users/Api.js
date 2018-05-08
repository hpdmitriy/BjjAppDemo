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

  const userRegisterByPhoneNumber = (displayName, phoneNo, password, country, token) => {
    const phoneVsCountry = country.split(' ')[1].slice(1, -1) + phoneNo
    return api.post('/api/v1/commands/execute/User.registerByPhoneNumber', {
      display_name: displayName,
      phone_no: phoneVsCountry,
      password: password
    })
  }

  const userGetAuthToken = (phoneNo, password) => {
    return api.post('/api/v1/commands/execute/User.getAuthToken', {
      phone_no: phoneNo,
      password: password
    })
  }

  const userConfirmPhone = (phoneNo, confirmCode, token = null) => {
    const reqData = {
      phone_no: phoneNo,
      confirm_code: confirmCode === '' ? null : confirmCode,
      token: token
    }
    return api.post('/api/v1/commands/execute/User.confirmPhoneNumber', omitBy(reqData, isNil))
  }

  const userGetProfile = (userId, token = null) => {
    const reqData = {
      user_id: userId,
      token: token,
      include: ['qualification', 'entity', 'tariff']
    }
    return api.post('/api/v1/commands/execute/User.getProfile', omitBy(reqData, isNil))
  }
  const userGetAvailableTariffs = (userId, token = '') => {
    const reqData = {
      user_id: userId,
      token: token,
    }
    return api.post('/api/v1/commands/execute/User.getAvailableTariffs', omitBy(reqData, isNil))
  }

  const userUpdateProfile = (userId,
                             description,
                             email,
                             login,
                             phoneNo,
                             photo,
                             currentPassword,
                             password) => {
    api.post('/api/v1/commands/execute/User.updateProfile', {
      user_id: userId,
      description: description,
      email: email,
      login: login,
      phone_no: phoneNo,
      photo: photo,
      current_password: currentPassword,
      password: password
    })
  }

  const userSetTariff = (userId, tariffId) => {
    api.post('/api/v1/commands/execute/User.setTariff', {
      user_id: userId,
      tariff_id: tariffId
    })
  }
  const userSetRating = (userId, score, comment) => {
    api.post('/api/v1/commands/execute/User.setRating', {
      user_id: userId,
      score: score,
      comment: comment
    })
  }
  // const getRoot = () => api.get('');
  // const getRate = () => api.get('rate_limit');
  // const getUserProfile = (username) => api.post('/api/v1/commands/execute/User.getProfile', {"user_id": username});
  // const getUser = (username) => api.get('search/users', {q: username});
  // const showCategoryList = () => api.post('/api/v1/commands/execute/Category.list', {});
  return {
    userRegisterByPhoneNumber,
    userGetAuthToken,
    userConfirmPhone,
    userGetProfile,
    userUpdateProfile,
    userGetAvailableTariffs,
    userSetTariff,
    userSetRating,
  }
}

export default {
  create
}
