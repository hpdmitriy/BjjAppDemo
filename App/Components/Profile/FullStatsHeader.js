import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import I18n from 'react-native-i18n'
import styles from './StatsStyles'

const watchIco = require('../../Images/Icons/watch.png') //45*26
const firstIco = require('../../Images/Icons/first.png') //33*36
const starStrokeIco = require('../../Images/Icons/starstroke.png') //2*41
const starIco = require('../../Images/Icons/star.png') //26*25
const voicesIco = require('../../Images/Icons/voices.png') //33*34
const playIco = require('../../Images/Icons/play_stroke.png') //33*34

function FullStatsHeader ({role, switcher, activeTab}) {
  if (role === 'Student') {
    return (<View style={styles.containerFullStatsHeader}>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(1)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 30 / 1.5,
                height: 17 / 1.5,
                tintColor: activeTab === 1 ? '#ef1b48' : '#282828'
              }]}
              source={ watchIco }
            />
            <Text style={[styles.statsDataText, {color: activeTab === 1 ? '#ef1b48' : '#282828'}]}>
              {I18n.t('watched')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(2)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 25 / 1.5,
                height: 27 / 1.5,
                tintColor: activeTab === 2 ? '#ef1b48' : '#282828'
              }]}
              source={ firstIco }
            />
            <Text
              style={[styles.statsDataText, {color: activeTab === 2 ? '#ef1b48' : '#282828'}]}
            >
              {I18n.t('learned')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(3)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 25 / 2,
                height: 24 / 2,
                tintColor: activeTab === 3 ? '#ef1b48' : '#282828'
              }]}
              source={ starStrokeIco }
            />
            <Text
              style={[styles.statsDataText, {color: activeTab === 3 ? '#ef1b48' : '#282828'}]}
            >
              {I18n.t('estimates')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>)
  }
  if (role === 'Teacher') {
    return (<View style={styles.containerFullStatsHeader}>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(1)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 41 / 2,
                height: 41 / 2,
                tintColor: activeTab === 1 ? '#ef1b48' : '#282828'
              }]}
              source={ playIco }
            />
            <Text style={[styles.statsDataText, {color: activeTab === 1 ? '#ef1b48' : '#282828'}]}>
              {I18n.t('uploaded')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(2)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 33 / 2,
                height: 34 / 2,
                tintColor: activeTab === 2 ? '#ef1b48' : '#282828'
              }]}
              source={ voicesIco }
            />
            <Text
              style={[styles.statsDataText, {color: activeTab === 2 ? '#ef1b48' : '#282828'}]}
            >
              {I18n.t('commented')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statsDataWrap}>
        <TouchableWithoutFeedback onPress={() => switcher(3)}>
          <View style={styles.statsData}>
            <Image
              style={[styles.statsIco, {
                width: 42 / 2,
                height: 41 / 2,
                tintColor: activeTab === 3 ? '#ef1b48' : '#282828'
              }]}
              source={ starStrokeIco }
            />
            <Text
              style={[styles.statsDataText, {color: activeTab === 3 ? '#ef1b48' : '#282828'}]}
            >
              {I18n.t('scored')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>)
  }
  return null
}
FullStatsHeader.PropTypes = {
  role: PropTypes.string,
  switcher: PropTypes.func,
  activeTab: PropTypes.number
}

export default FullStatsHeader
