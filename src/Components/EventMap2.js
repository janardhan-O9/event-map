import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CanvasFlowmapLayer";

const Map = () => {
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([37.8, -96], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);

    const data = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            origin: "New York",
            destination: "Los Angeles",
            value: 500,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.935242, 40.73061],
              [-118.243685, 34.052234],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            origin: "Chicago",
            destination: "Houston",
            value: 300,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-87.629798, 41.878114],
              [-95.369803, 29.760427],
            ],
          },
        },
      ],
    };

    const options = {
      canvasBezierStyle: {
        type: "classBreaks",
        field: "value",
        classBreakInfos: [
          {
            classMinValue: 0,
            classMaxValue: 100,
            symbol: {
              strokeStyle: "#ffffb2",
              lineWidth: 2,
            },
          },
          {
            classMinValue: 100,
            classMaxValue: 500,
            symbol: {
              strokeStyle: "#fecc5c",
              lineWidth: 3,
            },
          },
          {
            classMinValue: 500,
            classMaxValue: 1000,
            symbol: {
              strokeStyle: "#fd8d3c",
              lineWidth: 4,
            },
          },
          {
            classMinValue: 1000,
            classMaxValue: Infinity,
            symbol: {
              strokeStyle: "#e31a1c",
              lineWidth: 5,
            },
          },
        ],
      },
      animate: true,
      animationDuration: 2000,
      animationDelay: 100,
      maxFlowThickness: 10,
      arrowheads: {
        enabled: true,
        size: 5,
        frequency: "endonly",
      },
    };

    // layerRef.current = canvasFlowmapLayer(data, options).addTo(map);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default Map;
