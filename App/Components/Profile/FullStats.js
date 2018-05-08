import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import I18n from 'react-native-i18n'
import { trainingsListSelector, lessonsByUserSelector } from '../../selectors'
import styles from './StatsStyles'
import FullStatsHeader from './FullStatsHeader'
import FullStatsList from './FullStatsList'


class FullStats extends PureComponent {
  static propTypes = {
    role: PropTypes.string,
    trainingsList: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
    lessonsList: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
    dimensions: PropTypes.object
  }
  static contextTypes = {
    dimensions: PropTypes.object
  };
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
    }
  }
  switchTab = (num) => {
    return this.setState({activeTab: num})
  }
  render() {
    const {role, trainingsList, lessonsList, uid} = this.props
    const {dimensions} = this.context
    console.log(dimensions)
    const {activeTab} = this.state
    if (role === 'Student') {
      return (
        <View style={styles.fullStatsDescription}>
          <FullStatsHeader role={role} switcher={this.switchTab} activeTab={activeTab}/>
          <FullStatsList dimensions={dimensions} data={activeTab === 1 ? lessonsList : trainingsList} activeTab={activeTab} role={role}/>
        </View>
      )
    } else if (role === 'Teacher') {
      return (
        <View style={styles.fullStatsDescription}>
          <FullStatsHeader role={role} switcher={this.switchTab} activeTab={activeTab} />
          <FullStatsList dimensions={dimensions} data={activeTab === 1 ? lessonsList : trainingsList} activeTab={activeTab} role={role}/>
        </View>
      )
    } else return null
  }
}




const mapStateToProps = (state, props) => {
  return {
    trainingsList: trainingsListSelector(state),
    lessonsList: lessonsByUserSelector(state, {id:props.uid, role:props.role})
  }
}

export default connect(mapStateToProps, null)(FullStats)
