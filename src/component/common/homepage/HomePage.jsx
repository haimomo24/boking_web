import React from 'react'

import SliderComponent from '../Slider'
import Mainpage from '../Mainpage'
import MapPage from '../MapPage'

import QuestionPage from '../QuestionPage'
import CheckIn from '../CheckIn'



const HomePage = () => {
  return (
    <div>
       <SliderComponent/>
       <CheckIn/>
       <Mainpage/>
       <MapPage/>
      <QuestionPage/>
      {/* <User/> */}
      
    </div>
  )
}

export default HomePage