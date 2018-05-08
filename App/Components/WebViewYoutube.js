import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  PixelRatio,
  Dimensions,
  Platform,
  WebView,
  StyleSheet
} from 'react-native';
import {
  debugDisplay,
} from '../Services/ApiHelpers';

export default class WebViewYoutube extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      containerMounted: false,
      containerWidth: 0,
      containerHeight: 0
    };
  }

  componentDidMount() {
    this.setState({
      containerHeight: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9))
    });
  }
  createDivOverlays = () => {
    const topDiv = `<div 
  style="height: ${this.state.containerWidth * 0.2}px; 
  position: absolute; 
  top:0; 
  left:0; 
  right: 0; 
  background-color: 
  rgba(0,0,0,0); z-index: 99"></div>`;
    const leftDiv = `<div 
  style="width: ${this.state.containerWidth * 0.35}px; 
  position: absolute; 
  top:0; 
  left:0; 
  bottom: 0; 
  height: 100%;
  background-color: 
  rgba(0,0,0,0); z-index: 100"></div>`;
    const rightDiv = `<div 
  style="width: ${this.state.containerWidth * 0.35}px; 
  position: absolute; 
  top:0; 
  bottom: 0; 
  right: 0;
  height: 100%;
  background-color: 
  rgba(0,0,0,0); z-index: 101"></div>`;
    const bottomDiv = `<div 
  style="height: ${this.state.containerWidth * 0.2}px; 
  position: absolute; 
  bottom:0; 
  left:0; 
  right: 0; 
  background-color: 
  rgba(0,0,0,0); z-index: 99"></div>`;
    return [topDiv, leftDiv, rightDiv, bottomDiv];
  };
  render() {
    debugDisplay('Video component ', this.state);
    const divOverlays = this.createDivOverlays();
    return (
      <View
        style={[styles.container, this.props.styles]}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted &&
        <WebView
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
          source={{
            html: `<html>
                    <body style="${bodyStyle}">
                      <div id="div" style="${divStyle}">
                      <iframe id="vif" style="${iframeStyle}" src=https://www.youtube.com/embed/${this.props.video}?${urlParams} frameborder="0" allowfullscreen allowtransparency="1"></iframe>
                      </div>
               ${divOverlays[0]}
               ${divOverlays[1]}
               ${divOverlays[2]}
               ${divOverlays[3]}
               <!--<script>-->
                 <!--function highlightThis() {-->
                    <!--alert('124');-->
                 <!--}-->
                 <!--document.body.addEventListener("click", highlightThis, true)-->
                      <!--</script>-->
               </body></html>`
          }}
          style={{
            width: this.state.containerWidth,
            height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9))
          }}
        /> }
      </View>
    );
  }
}
const urlParams = 'modestbranding=1;rel=0;controls=0;showinfo=1;autoplay=0;iv_load_policy=1;fs=0';
const divHelper = `<div 
  style="height: ${this.s}; 
  position: absolute; 
  top:0; 
  left:0; 
  right: 0; 
  background-color: 
  rgba(155,255,055,0.3); z-index: 99"/>`;
const bodyStyle = 'padding: 0px; margin: 0; position: relative;';
const divStyle = 'position: relative; height: 0; overflow: hidden; padding-bottom: 56.25%;';
const iframeStyle = 'padding: 0; margin: 0; position: absolute; top:0; left: 0; width: 100%; height: 100%; z-index: 20';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
});
