import React from 'react'
import { Text, View } from 'react-native'
import htmlparser from 'htmlparser2-without-node-native'
import entities from 'entities'

import AutoSizedImage from './AutoSizedImage'

const defaultOpts = {
  lineBreak: '\n',
  paragraphBreak: '\n\n',
  bullet: '\u2022 ',
  TextComponent: Text,
  textComponentProps: null,
  NodeComponent: Text,
  nodeComponentProps: null,
  blockStyles: {},
  textStyles: {}
}

const Img = props => {
  const width =
    Number(props.attribs['width']) || Number(props.attribs['data-width']) || 0
  const height =
    Number(props.attribs['height']) ||
    Number(props.attribs['data-height']) ||
    0

  const imgStyle = {
    width,
    height
  }
  const source = {
    uri: props.attribs.src,
    width,
    height
  }
  return <AutoSizedImage source={source} style={imgStyle}/>
}

export default function htmlToElement (rawHtml, customOpts = {}, done) {
  const opts = {
    ...defaultOpts,
    ...customOpts
  }

  function domToElement (dom, parent) {
    if (!dom) return null

    const renderNode = opts.customRenderer
    return dom.map((node, index, list) => {
      if (renderNode) {
        const rendered = renderNode(
          node,
          index,
          list,
          parent,
          domToElement
        )
        if (rendered || rendered === null) return rendered
      }

      const {TextComponent} = opts
      if (node.type === 'text') {
        if (node.parent === null) {
          return (
            <View key={'v' + index} style={{...opts.blockStyles}}>
              <TextComponent
                {...opts.textComponentProps}
                key={index}
                style={parent ? opts.styles[parent.name] : opts.textStyles}
              >
                {entities.decodeHTML(node.data)}
              </TextComponent>
            </View>
          )
        } else {
          return (
            <TextComponent
              {...opts.textComponentProps}
              key={index}
              style={parent ? opts.styles[parent.name] : null}
            >
              {entities.decodeHTML(node.data)}
            </TextComponent>
          )
        }
      }

      if (node.type === 'tag') {
        if (node.name === 'img') {
          return <Img key={index} attribs={node.attribs}/>
        }
        if (node.name !== 'br' && node.children[0].name === 'img') {
          return <Img key={index} attribs={node.children[0].attribs}/>
        }

        let linkPressHandler = null
        if (node.name === 'a' && node.attribs && node.attribs.href) {
          linkPressHandler = () =>
            opts.linkHandler(entities.decodeHTML(node.attribs.href))
        }

        let linebreakBefore = null
        let linebreakAfter = null
        if (opts.addLineBreaks) {
          switch (node.name) {
            case 'pre':
              linebreakBefore = opts.lineBreak
              break
            case 'p':
              if (index < list.length - 1) {
                linebreakAfter = opts.paragraphBreak
              }
              break
            case 'br':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
              linebreakAfter = opts.lineBreak
              break
          }
        }

        let listItemPrefix = null
        if (node.name === 'li') {
          if (parent.name === 'ol') {
            listItemPrefix = `${index + 1}. `
          } else if (parent.name === 'ul') {
            listItemPrefix = opts.bullet
          }
        }

        const {NodeComponent} = opts

        const newComponent = <View key={'nv' + index} style={{...opts.blockStyles}}>
          <NodeComponent
            {...opts.nodeComponentProps}
            key={'nc' + index}
            onPress={linkPressHandler}
          >
            {/* {linebreakBefore} */}
            {listItemPrefix}
            {domToElement(node.children, node)}
            {/* {linebreakAfter} */}
          </NodeComponent>
        </View>
        return newComponent
      }
    })
  }

  const handler = new htmlparser.DomHandler((err, dom) => {
    if (err) done(err)
    done(null, domToElement(dom))
  })
  const parser = new htmlparser.Parser(handler)
  parser.write(rawHtml)
  parser.done()
}
