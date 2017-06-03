var stationList = require('./station_coordinates');

let getDistance = (userCoords, stationObj) => {
  var R = 6371e3; // metres
  var lat1 = userCoords.lat * (Math.PI / 180);
  var lat2 = stationObj.lat * (Math.PI / 180);
  var deltaLat = (stationObj.lat - userCoords.lat) * (Math.PI / 180);
  var deltaLong = (stationObj.long - userCoords.long) * (Math.PI / 180);

  var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

let getClosestStation = (userCoords) => {
  let stations = stationList.map( station => { 
    let stationDistance = getDistance(userCoords, {lat: station.gtfs_latitude, long: station.gtfs_longitude});
    let timeToStation = Math.ceil(stationDistance / 1.4 / 60);

      return { 
        name: station.name, 
        lat: station.gtfs_latitude, 
        long: station.gtfs_longitude,
        abbr: station.abbr,
        distance: stationDistance,
        userTime: timeToStation
      }
    }
  );

  let shortestDistance = Math.min.apply(Math, stations.map( station => station.distance ));
  let closestStation = stations.find( station => station.distance === shortestDistance );
 
  return closestStation;
};


export default getClosestStation;
