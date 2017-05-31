'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const parser = require('xml2json');
const stations = require('./stations.js');


router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/closest_station')
  .post((req, res) => {
    let closestStationObj = {
  	  station_name: req.body.station_name,
  	  direction: req.body.direction
    };

    let url = `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${closestStationObj.station_name}&key=QQZR-5GY8-99PT-DWE9&dir=${closestStationObj.direction}`;	

    axios.get(url)
    .then( (result) => {
      console.log('I am working from inside closest_station');
      var json = parser.toJson(result.data);
      res.send(JSON.parse(json));
    })
    .catch( (err) => {
      console.log('error from weather api: ', err.message);
    });

  });

//this is used for getting station longitude and latitude
router.route('/get_stations')
  .get((req, res) => {

    let url = `http://api.bart.gov/api/stn.aspx?cmd=stns&key=QQZR-5GY8-99PT-DWE9`;
    axios.get(url)
    .then( (result) => {
      console.log('I am working from inside get_stations');
      var json = parser.toJson(result.data);
      let data = JSON.parse(json);
      res.send(data.root.stations.station);
    })
    .catch( (err) => {
      console.log('error from weather api: ', err.message);
    });
  });

  router.route('/station_advisory')
  .post((req, res) => {

  	let stationObj = {
  		station: 'LAKE'
  	};

    let url = `http://api.bart.gov/api/bsa.aspx?cmd=bsa&orig=${stationObj.station}&key=QQZR-5GY8-99PT-DWE9`;
    axios.get(url)
    .then( (result) => {
      console.log('I am working from inside station_advisory');
      var json = parser.toJson(result.data);
      let data = JSON.parse(json);
      res.send(data);
    })
    .catch( (err) => {
      console.log('error from weather api: ', err.message);
    });
  });


  ///GET SEPCIFIC ROUTE INFORMATION NOT COMPLETE 

  // router.route('/schedule')
  // .get((req, res) => {

  //   let url = ``;
  //   axios.get(url)
  //   .then( (result) => {
  //     console.log('I am working from inside get_stations');
  //     var json = parser.toJson(result.data);
  //     let data = JSON.parse(json);
  //     res.send(data.root.stations.station);
  //   })
  //   .catch( (err) => {
  //     console.log('error from weather api: ', err.message);
  //   });
  // });

  //calls that need to happen 	 	
  	//arrive and or depart
  	//filtered real time estimates 
  	//routes and route information 
  	//holidays 
  	//station schedule 
  	//train count 

module.exports = router;
