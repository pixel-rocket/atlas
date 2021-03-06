import React, {useEffect, useMemo, useState} from "react";
import {MapContainer, Rectangle, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "./MapRenderer.css"
import L from "leaflet";
import Leaflet from 'leaflet'
import {useUser} from "../../contexts/UserContext";
import FriendMarker from "./FriendMarkers";
import MarkerClusterGroup from "react-leaflet-markercluster/src/react-leaflet-markercluster";
import {AvatarGroup} from "@material-ui/lab";
import * as ReactDOMServer from "react-dom/server";
import {Avatar} from "@material-ui/core";

/*These imports need to be in this order for the map to load properly*/

const MapIcons = (props) => {
    return (
        <MarkerClusterGroup iconCreateFunction={
            (cluster) => {
                const markers = cluster.getAllChildMarkers() ?? [];
                const friends = [];

                markers.forEach((value) => {
                    const html = value.options.icon.options.html

                    let name = html.split("alt=\"")[1];
                    name = name.substring(0, name.indexOf("\""));

                    let img = html.split("src=\"")[1];
                    img = img.substring(0, img.indexOf("\""));

                    friends.push({name: name, img: img})
                })

                return L.divIcon({
                    html: ReactDOMServer.renderToString(
                        <AvatarGroup max={2} spacing={"small"}>
                            {
                                friends.map((value, index) =>
                                    <Avatar
                                        key={`${value.name}-${index}`}
                                        alt={value.name}
                                        src={value.img} />)
                            }
                        </AvatarGroup>
                    ),
                    className: "not-a-real-class-to-disable-background"
                })
            }
        } >
            {
                props.icons.filter(friend => friend.showlocation || friend.showLocation).map((friend, index) => {
                    return <FriendMarker key={index} friend={friend}/>
                })
            }
        </MarkerClusterGroup>
    )
}

const MapRenderer = () => {
    const [zoom, setZoom] = useState(3);
    const [centrePosition, setCentrePosition] = useState([5, 176])
    const [state, dispatch] = useUser();
    const [iconList, setIconList] = useState([]);

    const corner1 = Leaflet.latLng(-90, -200)
    const corner2 = Leaflet.latLng(90, 200)
    const bounds = Leaflet.latLngBounds(corner1, corner2)

    useEffect(() => {
        if(state.friends){
            setIconList([...state.friends, {
                nickname: state.user.nickname,
                picture: state.user.picture,
                currentCoords: state.user.currentCoords,
                timezone: state.user.timezone,
                lat: state.user.lat,
                lng: state.user.lng,
                showLocation: state.user.showLocation,
                country: state.user.country,
            }])
        }
    }, [state])

    return <div>
        <MapContainer
            maxBoundsViscosity={1.0}
            maxBounds={bounds}
            center={centrePosition}
            zoom={zoom}
            maxZoom={13}
            minZoom={3}
            scrollWheelZoom={true}>
            <TileLayer
                maxZoom={20}
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
            {
                iconList !== [] && <MapIcons icons={iconList} />
            }
        </MapContainer>
    </div>;
};

export default MapRenderer;