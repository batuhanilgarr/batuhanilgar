const url = 'https://api.openweathermap.org/data/2.5/'
const key = '46610095b1aed58c7eb4c96e6933154c'

const setQuery = (e) => {
  if (e.keyCode == 13) getResult(searchBar.value)
}

const getResult = (cityName) => {
  if (
    cityName == 'istanbul' ||
    cityName == 'Istanbul' ||
    cityName == 'İstanbul' ||
    cityName == 'İSTANBUL' ||
    cityName == 'ISTANBUL'
  ) {
    document.body.style.backgroundImage = "url('images/ist-bg.jpg')"
  } else if (
    cityName == 'elbistan' ||
    cityName == 'Elbistan' ||
    cityName == 'ELBİSTAN'
  ) {
    document.body.style.backgroundImage = "url('images/elb.jpg')"
  } else if (
    cityName == 'ankara' ||
    cityName == 'Ankara' ||
    cityName == 'ANKARA'
  ) {
    document.body.style.backgroundImage = "url('images/ankara.jpg')"
  }

  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`

  fetch(query)
    .then((weather) => {
      return weather.json()
    })
    .then(displayResult)
}

// setInterval(() => {
//   var tarih = new Date()
//   var date = document.querySelector('.saat')
//   date.innerHTML = tarih.toUTCString()
// },1000);

const displayResult = (result) => {

  console.log(result)

  // document.querySelector('.mapapi').style.visibility = 'visible'

      let lat = document.querySelector('.lat')
      lat.innerHTML = `Lat : ${result.coord.lat}`

      let lon = document.querySelector('.lon')
      lon.innerHTML = `Lon : ${result.coord.lon}`

    var harita = new google.maps.Map(document.getElementById('harita'), {
      center: { lat: result.coord.lat, lng: result.coord.lon },
      zoom: 10,
      clickableIcons: true,
    })


  let city = document.querySelector('.city')
  city.innerHTML = `${result.name}, ${result.sys.country}`

  let temp = document.querySelector('.temp')
  temp.innerHTML = `${Math.round(result.main.temp)}°C`

  let desc = document.querySelector('.desc')
  desc.innerHTML = result.weather[0].description

  let minmax = document.querySelector('.minmax')
  minmax.innerHTML = `${Math.round(result.main.temp_min)}°C / ${Math.round(
    result.main.temp_max
  )}°C`
}

function initMap() {}

const searchBar = document.querySelector('#searchbar')
searchBar.addEventListener('keypress', setQuery)
