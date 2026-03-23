import React from 'react'

const HtmlParser = ({content}) => {
  return (
    <div dangerouslySetInnerHTML={{__html:content}} />
  )
}

export default HtmlParser