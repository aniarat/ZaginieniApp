// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
    iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [35, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
})

const Maptiler = () => {
    const [default_center, setCenter] = useState({ lat: 50.063390, lng: 19.939620 });
    const default_zoom = 10;
    const mapRef = useRef();
    // const [latitude, setLatitude] = useState();
    const handleAddMarker = () => {
        return (
            <Marker
                position={[50.0633, 20]}
                icon={markerIcon}>

                <Popup>
                    <b>to jest marker 2</b>
                </Popup>
            </Marker>)
    }
    return (
        <>
            <div>
                <MapContainer
                    center={default_center}
                    zoom={default_zoom}
                    ref={mapRef}
                >
                    <TileLayer
                        url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YZjWyVpcNutK6CSiH1Gz'}
                        attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'} />

                    <Marker
                        position={[50.063390, 19.939620]}
                        icon={markerIcon}>

                        <Popup>
                            <b>to jest marker 1</b>
                        </Popup>
                    </Marker>
                    {/* <Marker
                        position={[50.0633, 20]} 
                        icon={markerIcon}>

                            <Popup>
                                <b>to jest marker 2</b>
                            </Popup>
                        </Marker> */}


                </MapContainer>
                <button className="btn btn-danger btn-block my-2 my-sm-0" onClick={handleAddMarker} type="button">Dodaj pinezkę</button>

                {/* onClick={(e) => setFirstName(e.target.value)} */}

            </div>
        </>
    )
}
export default Maptiler;