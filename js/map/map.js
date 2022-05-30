function initMap() {
  const map = new google.maps.Map(document.getElementById('mapGoogle'), {
    zoom: 6,
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
}

const locations = [
  {
    name: 'Holtel Miranda Sevilla La Nueva',
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

// const locations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ]

window.initMap = initMap
