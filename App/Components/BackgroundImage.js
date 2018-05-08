import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

export default function BackgroundImage (args) {
  const {source, children, style, ...props} = args
  return (
    <Image
      source={source}
      style={{
        position: 'absolute',
        resizeMode: 'cover',
        flex: 1,
        width: '100%',
        height: '100%',
        ...style
      }}
      {...props}>
      { children }
    </Image>
  )
}
BackgroundImage.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object
}
