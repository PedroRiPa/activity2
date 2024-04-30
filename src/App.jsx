import axios from 'axios'
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import WeatherCard from './components/WeatherCard'


function App() {
  
  const [coords, setCoords] = useState()
  const [weather,setweather] = useState()
  const [temp, setTemp]= useState()
  const [isLoading, setIsLoading]=useState(true)
  useEffect(()=>{

    const success = pos => {
      
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  useEffect(()=>{
    if(coords){
      const API_KEY = '17524f3e9893f11d8e580d384dac0b31'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`      
      
      axios.get(url)
      .then(res => {

      setweather(res.data)
      const celsius = (res.data.main.temp -273.15).toFixed(1)
      const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
      setTemp({celsius, fahrenheit})
    }
    )
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  },[coords])
   
  console.log(weather)
  return (
    
    <div className='app'>
      {
        isLoading
        ? <h1>loading...</h1>
        :(
          <WeatherCard
          weather={weather}
          temp={temp}
  
          /> 
        )
      }

    </div>
  )
}

export default App 
