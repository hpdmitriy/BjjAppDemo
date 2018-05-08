import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Text, View, ScrollView, Alert } from 'react-native'
import { isUndefined, isNull, find, isNil, isEmpty, has } from 'lodash'
import TrainingsActions from '../../Redux/TrainingsRedux'
import WebViewYoutube from '../../Components/WebViewYoutube'
import { baseStyles, htmlStyles } from '../../Containers/Styles/OneMaterialScreenStyles'
import { Metrics } from '../../Themes/'
import I18n from 'react-native-i18n'
import styles from './TraListStyles'
import {
  addMainImg,
  restrictContentByTariff,
  calcLessonRating,
  trainingStatus,
  checkIsFavorites,
  getVideosIds,
  chekPrevVoted
} from '../../Services/ApiHelpers'
/**
 * @return {null}
 */

class OneLesson extends Component {
  static defaultProps = {
    injectComponent: null,
    awaiting: false,

  }
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
    navigate: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      scoredVisible: false
    }
  }

  componentWillMount () {
  }

  componentWillReceiveProps (newProps) {
  }

  handleLayout = (evt) => {
    //console.log(this.state.callRout, evt.nativeEvent);
  }
  handleRatingPress = (checkVoted) => {
    if (checkVoted) {
      Alert.alert(
        I18n.t('allReadyScoredTitle'),
        I18n.t('allReadyScoredMessage'),
        [
          {
            text: 'OK',
            onPress: () => null,
            style: {color: '#f11c1d'}
          },
        ],
        {cancelable: false}
      )
    } else {
      const {scoredVisible} = this.state
      this.setState({scoredVisible: !scoredVisible})
    }
  }
  handleChangeRating = (score, comment) => {
    this.props.lessonSetRatingRequest(this.props.data.id, score, comment, this.props.user.token)
  }

  handleLessonCreate = (restrictContent, trainingStatus, trainingId = 0) => {
    if (+restrictContent !== 0) {
      return (
        Alert.alert(
          I18n.t('tariffNotAllowTraining'),
          I18n.t('tariffNeedChange'),
          [
            {
              text: 'OK',
              onPress: () => null,
              style: {color: '#f11c1d'}
            },
          ],
          {cancelable: false}
        )
      )
    }
    if (trainingStatus === 'NOT_STARTED') {
      return this.props.lessonCreateTrainingRequest(this.props.data.id, this.props.users.token)
    }
    if(trainingId !== 0) {
      return this.props.navigate('OneTrainingScreen', {id: trainingId})
    }


  }

  render () {
    const {data, user, dimensions, orientation, navigate} = this.props
    if (isNil(data)) return null
    const difficulty = !isNil(data.difficulty) ? data.difficulty.name : 'not specified'
    const thisLessonScore = calcLessonRating(data.ratings, data.id)
    const training = trainingStatus(data.trainings, user.userProfile.id, data.id)
    const trainingId = training === 'NOT_STARTED' ? 0 : trainingStatus(data.trainings, user.userProfile.id, data.id, true)
    const thisIsFavorites = checkIsFavorites(data.favorites, user.userProfile.id, data.id)
    const checkVoted = chekPrevVoted(data.ratings, user.userProfile.id)
    let imgWidth = 0
    let imgHeight = 0
    if (orientation === 'portrait') {
      imgWidth = dimensions.width
      imgHeight = imgWidth / 1.5
    } else {
      imgWidth = dimensions.width / 2
      imgHeight = imgWidth / 1.5
    }
    const restrictContent = restrictContentByTariff(user, data.access_tags)
    let mainImg = data.preview_url
    if (isNull(mainImg)) {
      mainImg = !isUndefined(data.attachments) && data.attachments.length
        ? addMainImg(data.attachments) : addMainImg(null)
    }
    const lessonVideos = has(data, 'attachments') ? getVideosIds(data.attachments) : []
    console.log(lessonVideos)
    if (this.state.scoredVisible) {
      return (
        <Scored onPress={this.handleChangeRating} onCancelPress={this.handleRatingPress} type="Rating"/>
      )
    } else {
      return (
        <ScrollView style={[baseStyles.container, {marginBottom: 40}]}>
          {/*
           <View style={{alignSelf: 'center'}}>
           */}
          <Image source={{uri: mainImg}} style={{
            alignSelf: 'center',
            width: imgWidth,
            height: imgHeight
          }}/>
          {/*
           </View>
           */}
          <View style={[styles.lessonAttributes, {paddingHorizontal: 15, paddingTop: 15}]}>
            <Label
              text={difficulty}
              type='DIFFICULTY'
            />
            <Rating onPress={() => this.handleRatingPress(checkVoted)} type='lessonRate' count={5}
                    score={thisLessonScore}/>
            <Label
              text={training.replace('_', ' ')}
              type={training}
              onPress={() => this.handleLessonCreate(restrictContent, training, trainingId)}
            />
            <BoockMarck onPress={() => this.props.lessonSetFavoriteFlagRequest(data.id, 'toggle', user.token)}
                        isFavorites={thisIsFavorites}/>
          </View>
          <View style={baseStyles.materialHeader}>
            <Text style={baseStyles.materialTitle}>{data.title}</Text>
          </View>

          {+restrictContent === 0 ? <View>
            <HTMLView
              value={data.description}
              stylesheet={htmlStyles}
              style={{paddingBottom: Metrics.doubleBaseMargin}}
              NodeComponent={Text}
              TextComponent={Text}
              blockStyles={{paddingHorizontal: 15, paddingTop: 15}}
              textStyles={baseStyles.content}
            />
            { !isEmpty(lessonVideos) ? lessonVideos.map(video =>
              <WebViewYoutube key={video} video={video} styles={{marginBottom: 20}}/>
            )
              : null
            }
          </View> : <RestrictContent tariff={find(user.userAvailableTariffs
            , (t) => t.id === restrictContent)} navigate={navigate} navigator='ProfileScreen'/> }
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state) => (
  {
    /*
     users: state.users,*/
    lessons: state.lessons,

  }
)

const mapDispatchToProps = (dispatch) => (
  {
    lessonSetFavoriteFlagRequest: (id, flag, token) => {
      dispatch(LessonsActions.lessonSetFavoriteFlagRequest(id, flag, token))
    },
    lessonSetRatingRequest: (id, score, comment, token) => {
      dispatch(LessonsActions.lessonSetRatingRequest(id, score, comment, token))
    },
    lessonCreateTrainingRequest: (id, token) => {
      dispatch(LessonsActions.lessonCreateTrainingRequest(id, token))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(OneLesson)


