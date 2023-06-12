import React from 'react'
import Navbar from './Navbar'
import {useSelector} from 'react-redux';
import TechDiff from './TechDiff';
function Home() {
  const {isSuccess}= useSelector((state)=>state.user);
  const isLoggedIn= JSON.parse(localStorage.getItem('isLoggedIn'));
  console.log("LoggedIn home",isLoggedIn)
  if(!isLoggedIn){
    return (
      <TechDiff/>
    )
  }
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home
