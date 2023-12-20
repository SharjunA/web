'use client';

import { Button, Modal, Label, TextInput, Checkbox } from 'flowbite-react';
import { useState, useEffect } from "react";

import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
import { IoAddCircle, IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import TaskCard from "./components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { MapStyle } from "components/card/MapStyle";
import mapboxgl from 'mapbox-gl';
import * as Chart from 'chart.js';
import * as turf from '@turf/turf';

import MapComponent from 'components/locationSearch/mapComponent';
import LocationInput from 'components/locationSearch/inputField';

import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS
import ProfileIcon from 'components/icons/ProfileIcon';

const MapboxComponent = () => {
  const [mapStyle, setMapStyle] = useState("satellite-streets-v12");

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhcmF0aHJhai0xMjMiLCJhIjoiY2xxNWVkZGdvMDZiZDJqcDc3NWg4Z2JneCJ9.etCSsr3cuVqLhOXrTedVBw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/' + mapStyle,
      center: [76.9869220, 35.5076488],
      zoom: 11,
    });

    map.addControl(new mapboxgl.FullscreenControl(), "top-left");

    map.on('load', () => {
      map.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      });
      // Add 3D terrain
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 1.5
      });
      map.addSource('earthquakes', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([76.9269220, 35.5076488])
        .addTo(map);
      new mapboxgl.Marker({ color: "yellow" })
        .setLngLat([76.9769220, 35.5076488])
        .addTo(map);
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([76.9969220, 35.4876488])
        .addTo(map);
      new mapboxgl.Marker({ color: "black" })
        .setLngLat([77.0269220, 35.4876488])
        .addTo(map);

      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [76.9269220, 35.5076488],
              [76.9769220, 35.5076488],
              [76.9969220, 35.4876488],
              [77.0269220, 35.4876488]
            ]
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'blue',
          'line-width': 4
        }
      });

      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [76.9269220, 35.5076488],
                [76.9769220, 35.5076488],
                // [76.9969220, 35.4876488],
                [76.9769220, 35.426488],
                [76.969220, 35.456488],
                [76.9569220, 35.5216488],
                [76.9769220, 35.5076488],
              ]
            ]
          }
        }
      });


      // Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });


      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      });
      // Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });


      map.addLayer(
        {
          'id': 'earthquakes-heat',
          'type': 'heatmap',
          'source': 'earthquakes',
          'maxzoom': 9,
          'paint': {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              0,
              0,
              6,
              1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0
            ]
          }
        },
        'waterway-label'
      );

      map.addLayer(
        {
          'id': 'earthquakes-point',
          'type': 'circle',
          'source': 'earthquakes',
          'minzoom': 7,
          'paint': {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
              16,
              ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)'
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              0,
              8,
              1
            ]
          }
        },
        'waterway-label'
      );
    });



    // Cleanup map on component unmount
    return () => map.remove();
  }, [mapStyle]);

  return <div id="map" style={{ top: 0, bottom: 0, width: '100%', height: "100%", borderRadius: "12px" }} >
    <div className="absolute z-50 top-1 right-1">
      <MapStyle setMapStyle={setMapStyle} mapStyle={mapStyle} />
      <div id="chart-container">
        <div id="chart-inner-container">
          <canvas id="chart-canvas"></canvas>
        </div>
      </div>
    </div>
  </div>;
};


const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [duration, setDuration] = useState('');
  const [members, setMembers] = useState([]);

  const [memberName, setMemberName] = useState('');
  // const [start,setStart] = useState('');
  // const [end, setEnd] = useState('');
  // const [duration, setDuration] = useState('');


  function onCloseModal() {
    setOpenModal(false);
    setName('');
  }


  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 flex justify-between w-full" >
        <div className="gap-5 inline-flex overflow-x-scroll w-max">
          <Widget
            icon={<ProfileIcon className="h-5 w-5" />}
            title={"Batch 1"}
            subtitle={"4 members"}
          />
          <Widget
            icon={<ProfileIcon className="h-6 w-6" />}
            title={"Batch 2"}
            subtitle={"18 members"}
          />
        </div>
        <div className="w-20" onClick={() => setOpenModal(true)}>
          <Widget
            icon={<IoAddCircle className="h-6 w-6" />}
          />
        </div>
        <Modal dismissible show={openModal} size="lg" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Batch for field</h3>
              <div className="flex flex-col md:flex-row  gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Batch Name" />
                  </div>
                  <TextInput
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="duration" value="Estimated Duration" />
                  </div>
                  <TextInput id="duration" type="duration" value={name}
                    onChange={(event) => setDuration(event.target.value)} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="startLocation" value="Start Location" />
                  </div>
                  <TextInput id="startLocation" type="text" value={name}
                    onChange={(event) => setStart(event.target.value)} required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="endLocation" value="End Location" />
                  </div>
                  <TextInput id="endLocation" type="endLocation" value={name}
                    onChange={(event) => setEnd(event.target.value)} required />
                </div>
              </div>
              {/* <MapComponent onLocationSelect={handleLocationSelect} />
              <LocationInput onLocationSelect={handleLocationSelect} />

              {selectedLocation && (
                <div>
                  <h2>Selected Location:</h2>
                  <p>Latitude: {selectedLocation.lat}</p>
                  <p>Longitude: {selectedLocation.lng}</p>
                </div>
              )} */}
              <div className="w-full">
                <Button>Create the batch</Button>
              </div>

            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="mb-6 mt-6">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Location Mapping
        </h4>
        <div className="mt-4 w-full h-[65vh] bg-white rounded-2xl p-4">
          <MapboxComponent />
        </div>
      </div>

      {/* Complex Table , Task & Calendar */}

      <ComplexTable
        columnsData={columnsDataComplex}
        tableData={tableDataComplex}
      />

    </div >
  );
};

export default Home;

