import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { umkmList } from "../data/umkmData";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple, LatLngBounds } from "leaflet";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const kampusDinamika = [-7.310820470765489, 112.7821763079304];

function MapBounds() {
  const map = useMap();

  useEffect(() => {
    // Selalu set view ke kampus Dinamika sebagai patokan awal
    map.setView(kampusDinamika, 16);
  }, [map]);

  return null;
}

export default function MapView() {
  const MAPTILER_KEY = "eALor44jTUVM3vyFZ2Ri";

  return (
    <div className="w-full h-[80vh]">
      <MapContainer
        center={kampusDinamika}
        zoom={16}
        className="h-full w-full rounded-none"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
        />

        <MapBounds />

        {/* Marker Kampus dengan icon merah */}
        <Marker
          position={kampusDinamika}
          icon={
            new L.Icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>
            <strong>Universitas Dinamika</strong>
            <br />
            STIKOM Surabaya
            <br />
            Jl. Kedung Baruk No. 98
            <br />
            Surabaya, Jawa Timur
          </Popup>
        </Marker>

        {/* Marker UMKM dengan icon biru default */}
        {umkmList.map((u) => (
          <Marker key={u.id} position={u.position}>
            <Popup>
              <strong>{u.name}</strong>
              <br />
              {u.category}
              <br />
              {u.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
