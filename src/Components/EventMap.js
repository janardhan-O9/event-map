import React, { Component } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-swoopy"

export class EventMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.addEvents();
    }

    render() {
        return <div id="map" style={{ height: "100vh" }}></div>;
    }

    async addEvents() {
        console.log("Inside the addEvents function with response");
        let map = Leaflet.map("map", {
            minZoom: 2,
            maxZoom: 9,
            // maxBoundsViscosity:1,
            // worldCopyJump: true,
            //maxBounds: [[-90,-180],[90,180]]
        }).setView([35, 0], 3.0);

        let baseMaps = {
            "Light Mode": Leaflet.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                }
            ).addTo(map),
            "Dark Mode": Leaflet.tileLayer(
                "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
                {
                    attribution:
                        "&copy;<a href='&quot;https://cartodb-basemaps&quot;>'>cartodb-basemaps</a>",
                }
            ),
            "Local Server": Leaflet.tileLayer('http://10.135.3.228:3000/osm/{z}/{x}/{y}.png')
        };
        Leaflet.control.scale().addTo(map);
        var layerControl = Leaflet.control.layers(baseMaps).addTo(map);

        let arrowFG = new Leaflet.FeatureGroup();
        let arrow =  Leaflet.swoopyArrow([38, 77], [39, -104], {
            weight: 2.5,
            // factor: -0.5,
            arrowFilled: true,
            color: 'green',
          });
        arrowFG.addLayer(arrow);
        arrowFG.addTo(map);

        // let arrowLayer = Leaflet.layerGroup([arrow]).addTo(map)

        console.log(arrowFG.getBounds())
        
        map.fitBounds(arrowFG.getBounds());
    }
}