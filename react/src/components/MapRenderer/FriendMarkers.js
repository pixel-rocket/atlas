import React from 'react';
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Avatar} from "@material-ui/core";
import * as ReactDOMServer from "react-dom/server";

const FriendMarker = (props) => {

    const icon = L.divIcon({
        html: ReactDOMServer.renderToString(<Avatar src={props.friend.picture} alt={props.friend.nickname} />),
        className: "not-a-real-class-to-disable-background"
    });

    let options = {
            timeZone: props.friend.timezone,
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }
    console.log(`user: ${props.friend.nickname} | timezone: ${props.friend.timezone} `)
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return (

        <Marker
            position={[props.friend.lat, props.friend.lng]}
            icon={icon}
        >
            <Popup>
                {props.friend.nickname}
                <br/>
                {formatter.format(new Date())}
                <br/>
                {props.friend.country}
            </Popup>
        </Marker>
    )
};

export default FriendMarker;