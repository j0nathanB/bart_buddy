var stations = require('./station_coordinates');

let getDistance = (userCoords, stationCoords) => {
  var R = 6371e3; // metres
  var lat1 = userCoords.lat * (Math.PI / 180);
  var lat2 = stationCoords.lat * (Math.PI / 180);
  var deltaLat = (stationCoords.lat - userCoords.lat) * (Math.PI / 180);
  var deltaLong = (stationCoords.long - userCoords.long) * (Math.PI / 180);

  var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

let getClosestStation = (userCoords) => {
  let distances = [];
  let stationCoords = stations.map( function (station) {
    return {name: station.name, lat: station.gtfs_latitude, long: station.gtfs_longitude};
  });

  for (let i = 0; i < stations.length; i++) {
    distances.push({ 
      name: stationCoords[i].name, 
      lat: stationCoords[i].lat, 
      long: stationCoords[i].long, 
      distance: getDistance(userCoords, stationCoords[i]) 
    });
  }

  let shortestDistance = Math.min.apply(Math, distances.map( station => station.distance ));
  let closestStation = distances.find( station => station.distance === shortestDistance );
 
  return closestStation;
};

let userTimeToStation = (userCoords) => {

};

export default getClosestStation;

