function initMap() {
  const map = new google.maps.Map(document.getElementById('mapGoogle'), {
    zoom: 4,
    center: { lat: 40.416704, lng: -3.703592 },
  })
  const infoWindow = new google.maps.InfoWindow({
    content: '',
    disableAutoPan: true,
  })
  // Create an array of alphabetical characters used to label the markers.
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const label = position.name
    const svgMarker = {
      path:
        'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
      fillColor: 'blue',
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    }
    const marker = new google.maps.Marker({
      position,
      icon: svgMarker,
      label,
    })

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener('click', () => {
      infoWindow.setContent(label)
      infoWindow.open(map, marker)
    })
    return marker
  })

  // Add a marker clusterer to manage the markers.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers })

  //Geolocation Google Maps//
  const locationButton = document.createElement('button')

  locationButton.textContent = 'Pan to Current Location'
  locationButton.classList.add('custom-map-control-button')
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
  locationButton.addEventListener('click', () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          infoWindow.setPosition(pos)
          infoWindow.setContent('Location found.')
          infoWindow.open(map)
          map.setCenter(pos)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter())
        },
      )
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter())
    }
  })

  //-------------------------------Google matrix Api-------------------------------------------//

  //Create button to get Response data//
  const locationNear = document.createElement('button')

  locationNear.textContent = 'Get location'
  locationNear.classList.add('custom-map-control-button')
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(locationNear)

  //Call to data
  locationNear.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        infoWindow.setPosition(pos)

        const geocoder = new google.maps.Geocoder()
        const service = new google.maps.DistanceMatrixService()

        // build request
        const origin1 = { lat: pos.lat, lng: pos.lng }
        const destinationA = locations
        const request = {
          origins: [origin1],
          destinations: [destinationA],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }

        // put request on page
        document.getElementById('request').innerText = JSON.stringify(
          request,
          null,
          2,
        )

        // put response
        document.getElementById('response').innerText = JSON.stringify(
          response,
          null,
          2,
        )
        // show on map
        const originList = response.originAddresses

        const destinationList = response.destinationAddresses

        deleteMarkers(markersArray)

        const showGeocodedAddressOnMap = (asDestination = boolean) => {
          const handler = ({ results } = google.maps.GeocoderResponse) => {
            map.fitBounds(bounds.extend(results[0].geometry.location))
            markersArray.push(
              new google.maps.Marker({
                map,
                position: results[0].geometry.location,
                label: asDestination ? 'D' : 'O',
              }),
            )
          }

          return handler
        }

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements

          geocoder
            .geocode({ address: originList[i] })
            .then(showGeocodedAddressOnMap(false))

          for (let j = 0; j < results.length; j++) {
            geocoder
              .geocode({ address: destinationList[j] })
              .then(showGeocodedAddressOnMap(true))
          }
        }
      })

      // // // put response
      // document.getElementById('response').innerText = JSON.stringify(
      //   response,
      //   null,
      //   2,
      // )
    } else {
      handleLocationError(false, infoWindow, map.getCenter())
    }
  })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation.",
  )
  infoWindow.open(map)
}

const locations = [
  {
    name: 'Hotel Miranda Sevilla La Nueva',
    lat: 40.348094,
    lng: -4.027125,
  },
  {
    name: 'Hotel Miranda Loranca',
    lat: 40.296361,
    lng: -3.837753,
  },
  {
    name: 'Hotel Miranda Ourense',
    lat: 42.336376,
    lng: -7.864434,
  },
  {
    name: 'Hotel Miranda Vizcaya',
    lat: 43.380409,
    lng: -2.562638,
  },
  {
    name: 'Hotel Miranda Sevilla',
    lat: 37.384803,
    lng: -5.992449,
  },
  {
    name: 'Hotel Miranda Barcelona',
    lat: 41.402716,
    lng: 2.165743,
  },
  {
    name: 'Hotel Miranda Toledo',
    lat: 39.864613,
    lng: -4.02746,
  },
  {
    name: 'Hotel Miranda Asturias',
    lat: 43.533997,
    lng: -7.04008,
  },
  {
    name: 'Hotel Miranda Alicante',
    lat: 38.359205,
    lng: -0.473347,
  },
  {
    name: 'Hotel Miranda Alicante',
    lat: 38.359205,
    lng: -0.473347,
  },
  {
    name: 'Hotel Miranda Benavente',
    lat: 42.002813,
    lng: -5.676984,
  },
]

window.initMap = initMap
