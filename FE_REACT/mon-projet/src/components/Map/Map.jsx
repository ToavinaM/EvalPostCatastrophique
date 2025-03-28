import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

const { BaseLayer } = LayersControl;

const Map = () => {
    const position = [-18.918175169505677, 47.52107863993858]; // Coordonnées

    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <LayersControl position="topright">
                    {/* Vue Carte Standard (OpenStreetMap) */}
                    <BaseLayer checked name="Carte">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            maxZoom={19} // Augmente la limite de zoom
                        />
                    </BaseLayer>

                    {/* Vue Satellite (Google Maps) */}
                    <BaseLayer name="Satellite">
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            attribution="&copy; Google Maps"
                            maxZoom={21}
                        />
                    </BaseLayer>
                </LayersControl>

                <Marker position={position}>
                    <Popup>
                        <p>Bonjour, je suis ici !</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
