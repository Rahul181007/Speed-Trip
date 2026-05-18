import type { TripPoint } from "../types/tripTypes";
import {MapContainer,Marker,Popup,Polyline,TileLayer,CircleMarker, useMap} from "react-leaflet";
import L from "leaflet";
import markerIcon2x
from "leaflet/dist/images/marker-icon-2x.png";

import markerIcon
from "leaflet/dist/images/marker-icon.png";

import markerShadow
from "leaflet/dist/images/marker-shadow.png";
delete (
    L.Icon.Default.prototype as {
        _getIconUrl?: unknown;
    }
)._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl: markerIcon2x,

    iconUrl: markerIcon,

    shadowUrl: markerShadow,
});

const startIcon = new L.Icon({

    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",

    shadowUrl: markerShadow,

    iconSize: [25, 41],

    iconAnchor: [12, 41],
});

const endIcon = new L.Icon({

    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

    shadowUrl: markerShadow,

    iconSize: [25, 41],

    iconAnchor: [12, 41],
});




interface TripMapProps{
    tripPoints:TripPoint[]
}


const FitBounds = ({
    coordinates
}: {
    coordinates: [number, number][]
}) => {

    const map = useMap();

    if (coordinates.length > 0) {

        map.fitBounds(
            coordinates,
            {
                padding: [50, 50]
            }
        );
    }

    return null;
};

const TripMap = ({tripPoints}:TripMapProps) => {
    if(tripPoints.length===0)return null


    const routeCoordinates:[number,number][]=tripPoints.map((point)=>[
        point.latitude,
        point.longitude
    ])

    const startCoordinate =
    routeCoordinates[0];

const endCoordinate =
    routeCoordinates[
        routeCoordinates.length - 1
    ];
  return (
   <MapContainer

   scrollWheelZoom={true}
   className="h-125 w-full rounded-2xl"
   >
   <TileLayer  attribution="&copy; OpenStreetMap contributors"
   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
   <FitBounds
    coordinates={routeCoordinates}
/>
   <Polyline 
   positions={routeCoordinates}
   pathOptions={{
            color: "#2563EB",
        weight:4 
   }}
   />
{

    tripPoints.map(
        (point, index) => {


        if (
            index === 0
            ||
            !point.isOverspeed
        ) {
            return null;
        }

        const previousPoint =
            tripPoints[index - 1];

        return (

            <Polyline

                key={`overspeed-${point.id}`}

                positions={[
                    [
                        previousPoint.latitude,
                        previousPoint.longitude
                    ],
                    [
                        point.latitude,
                        point.longitude
                    ]
                ]}

                pathOptions={{

                    color: "#22D3EE",

                   weight: 6,


                    opacity: 1
                }}
            />
        );
    })
}
{

    tripPoints

        .filter(
            (point) =>
                point.isIdle
        )

        .map((point) => (

        <CircleMarker

            key={`idle-${point.id}`}

            center={[
                point.latitude,
                point.longitude
            ]}

            radius={4}

            pathOptions={{

                color: "#EC4899",

                fillColor: "#EC4899",

                fillOpacity: 1,
                weight: 2
            }}
        >

            <Popup>
                Idle Point
            </Popup>

        </CircleMarker>
    ))
}

{

    tripPoints

        .filter(
            (point) =>
                point.isStopped
        )

        .map((point) => (

        <CircleMarker

            key={`stop-${point.id}`}

            center={[
                point.latitude,
                point.longitude
            ]}

            radius={4}

            pathOptions={{

                color: "#1E3A8A",

                fillColor: "#1E3A8A",

                fillOpacity: 1,
                weight: 2
            }}
        >

            <Popup>
                Stoppage Point
            </Popup>

        </CircleMarker>
    ))
}

<Marker position={startCoordinate} icon={startIcon}>
  <Popup>Start Point</Popup>
</Marker>

<Marker position={endCoordinate} icon={endIcon}>
<Popup>End Point</Popup>
</Marker>


    </MapContainer>
  )
}

export default TripMap
