import apisauce from 'apisauce'
import RNFetchBlob from 'react-native-fetch-blob'
import { omitBy, isNil } from 'lodash'
import { API_URL, MEDIA_PATH } from '../../Config/Constants'

export const uploadToServer = ({upload_url, token, title}, data, cb = null) => {
  return RNFetchBlob.fetch(
    'POST',
    upload_url,
    {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'octet-stream',

    },
    [
      {
        name: 'file',
        filename: `${Math.random().toString(36).slice(2)}.${title}`,
        data: RNFetchBlob.wrap(data.path)
      }
    ]
  ).uploadProgress({interval: 250}, (written, total) => {
    if (typeof cb === 'function') {
      cb({
        ev: 'UPLOAD_TO_SERVER_PROGRESS',
        d: {uploaded: `${(written / total) * 100}%`}
      })
    }
      console.log('uploaded', written / total)
  }).progress({count: 10}, (received, total) => {
    if (typeof cb === 'function') {
      cb({
        ev: 'UPLOAD_TO_SERVER_PROGRESS',
        d: {progress: `${(received / total) * 100}%`}
      })
    }
    console.log('progress', received / total)
  }).then((resp) => {
    return resp
  })
    .catch((err) => {
      return err
    })
}
const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json; charset=utf-8'
    },
    timeout: 10000
  })

  const attachmentGetUploadUrl = (mimeType, token = null) => {
    const reqData = {
      mime_type: mimeType,
      token: token
    }
    return api.post('/api/v1/commands/execute/Attachment.getUploadUrl', omitBy(reqData, isNil))
  }
  const attachmentCreate = (mimeType = null, url = null, token = null) => {
    const reqData = {
      mime_type: mimeType,
      url: url,
      token: token
    }
    return api.post('/api/v1/commands/execute/Attachment.create', omitBy(reqData, isNil))
  }
  const attachmentCheckDoneUploadToYoutube = (id) => {
    return api.get(`https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`)
    //return api.get(`http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3D${id}`)
  }

  const attachmentUploadToYoutube = (mediaHash = null,
                                     title = null,
                                     description = null,
                                     token = null,
                                     privacyStatus = 'unlisted',
                                     notifySubscribers = true,
                                     progressInterval = 250,
                                     deleteMediaAfterUpload = true) => {
    const reqData = {
      media_hash: mediaHash,
      title: title,
      description: description,
      token: token,
      privacy_status: privacyStatus,
      notify_subscribers: notifySubscribers,
      progress_interval: progressInterval,
      delete_media_after_upload: deleteMediaAfterUpload,
    }
    return api.post('/api/v1/commands/execute/Youtube.upload', omitBy(reqData, isNil))
  }
  return {
    attachmentGetUploadUrl,
    attachmentCreate,
    attachmentUploadToYoutube,
    attachmentCheckDoneUploadToYoutube
  }
}

export default {
  create
}
