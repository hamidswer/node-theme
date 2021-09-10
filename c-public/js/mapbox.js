export const displayMap = (mapLocation) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaGFtaWRzd2VyMiIsImEiOiJja2xkNmg5NGsxNzRrMnBwOXl3bjB6cmE5In0.aBDZyhMRYx5ukx1D6laI4Q'
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hamidswer2/ckslat59yl5i517p6octma6n7'
  })
  const bounds = new mapboxgl.LngLatBounds()
  const mapEl = document.createElement('div')
  mapEl.className = 'marker'
  new mapboxgl.Marker({
    element: mapEl,
    anchor: 'bottom'
  })
    .setLngLat(mapLocation.coordinates)
    .addTo(map)
  bounds.extend(mapLocation.coordinates)
  map.fitBounds(bounds)
}
