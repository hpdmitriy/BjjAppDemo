import { createSelector } from 'reselect'
import {has, find} from 'lodash'

const lessonsGetter = state => state.lessons
const userGetter = state => state.users
const trainingsGetter = state => state.trainings
const successGetter = state => state.success
const errorGetter = state => state.errors
const idGetter = (state, props) => {
  if (typeof props === 'number') {
    return props
  } else return props.id
}
const roleGetter = (state, props) => {
  if (typeof props === 'object') {
    return props.role
  } else return props
}
const idGetterInNavParams = ({nav}) => {
  const hasIdInNavParams = has(nav.routes[nav.index], ['params', 'id'])
  return hasIdInNavParams ? nav.routes[nav.index].params.id : null
}

export const activeLessonSelectorFactory = () => createSelector(lessonsGetter, idGetterInNavParams, (lessons, id) => {
  const hasLessonsList = has(lessons, ['lessonList', 'rows'])
  return hasLessonsList ? find(lessons.lessonList.rows, (lesson) => lesson.id === id) : null
})
export const lessonDifficultySelectorFactory = () => createSelector(lessonsGetter, idGetter, (lessons, id) => {
  const hasLessonsList = has(lessons, ['lessonList', 'rows'])
  return hasLessonsList ? find(lessons.lessonList.rows, (lesson) => lesson.id === id).difficulty : null
})

export const successSelector = createSelector(successGetter, (success) => {
  return success
})
export const difficultyListSelector = createSelector(trainingsGetter, (training) => {
  return training.difficultyList
})
export const errorsSelector = createSelector(errorGetter, (errors) => {
  return errors
})
export const trainingsListSelector = createSelector(trainingsGetter, (training) => {
  return training.trainingsList === null ? null : training.trainingsList.rows
})
export const lessonsByUserSelector = createSelector(lessonsGetter, idGetter, roleGetter, (lessons, uid, role) => {
  const hasLessonsList = has(lessons, ['lessonList', 'rows'])
  if (!hasLessonsList) {
    return null
  } else {
    if (role === 'Student') {
      const watchedLessonsIdSet = new Set()
      const watchedLessons = []
      lessons.lessonList.rows.forEach((lesson) => {
        const hasTraining = lesson.trainings
        if (Array.isArray(hasTraining) && hasTraining.length) {
          hasTraining.forEach((training) => {
            if (training.student_user_id === uid && !watchedLessonsIdSet.has(training.id)) {
              watchedLessonsIdSet.add(training.id)
              watchedLessons.push(lesson)
            }
          })
        }
      })
      return watchedLessons
    } else {
      return lessons.lessonList.rows.filter(lesson => lesson.author.id === uid)
    }
  }
})
