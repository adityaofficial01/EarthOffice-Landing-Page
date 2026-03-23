import React from 'react'

const TitleHeaderContainer = ({children}) => {
  return (
     <div className="flex sticky top-0 z-40 bg-white/10 backdrop-blur-sm p-1 rounded-lg gap-2 md:justify-between items-center flex-wrap md:flex-nowrap mb-5">
      {children}
    </div>
  )
}

export default TitleHeaderContainer
