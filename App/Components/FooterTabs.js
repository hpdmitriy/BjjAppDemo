import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/FooterTabsStyles'

const eventIco = require('../Images/Icons/events.png')
const materialsIco = require('../Images/Icons/materials.png')
const techniquesIco = require('../Images/Icons/techniques.png')
const trainingsIco = require('../Images/Icons/training.png')
const profileIco = require('../Images/Icons/profile.png')

export default function FooterTabs (props) {
  const {activeTabScreen, navigate} = props
  return (
    <View style={styles.footerTabsContainer}>
      <TouchableWithoutFeedback
        style={styles.footerTab}
        onPress={() => navigate('EventsScreen')}
      >
        <Image
          source={eventIco}
          style={activeTabScreen === 'EventsScreen' ? styles.tabIconActive : styles.tabIcon}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.footerTab}
        onPress={() => navigate('MaterialsScreen')}
      >
        <Image
          source={materialsIco}
          style={activeTabScreen === 'MaterialsScreen' ? styles.tabIconActive : styles.tabIcon}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.footerTab}
        onPress={() => navigate('TechniquesScreen')}
      >
        <Image
          source={techniquesIco}
          style={activeTabScreen === 'TechniquesScreen' ? styles.tabIconActive : styles.tabIcon}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.footerTab}
        onPress={() => navigate('TrainingsScreen')}
      >
        <Image
          source={trainingsIco}
          style={activeTabScreen === 'TrainingsScreen' ? styles.tabIconActive : styles.tabIcon}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.footerTab}
        onPress={() => navigate('ProfileScreen')}
      >
        <Image
          source={profileIco}
          style={activeTabScreen === 'ProfileScreen' ? styles.tabIconActive : styles.tabIcon}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}
FooterTabs.propTypes = {
  activeTabScreen: PropTypes.string,
  navigate: PropTypes.func.isRequired
}
