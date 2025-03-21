import React from 'react'

import SliderComponent from '../Slider'
import Mainpage from '../Mainpage'
import MapPage from '../MapPage'

import QuestionPage from '../QuestionPage'



const HomePage = () => {
  return (
    <div>
       <SliderComponent/>
       <Mainpage/>
       <MapPage/>
      <QuestionPage/>
      {/* <User/> */}
      
    </div>
  )
}

export default HomePage