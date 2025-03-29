import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Map.scss';

const { BaseLayer } = LayersControl;

const Map = () => {
    const position = [-18.918175169505677, 47.52107863993858]; // Coordonnées

    const handleDrawCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const coordinates = layer.getLatLngs();
            console.log("Coordonnées du polygone :", coordinates);
        }
    };

    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <LayersControl position="topright">
                    <BaseLayer checked name="Carte">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            maxZoom={19}
                        />
                    </BaseLayer>

                    <BaseLayer name="Satellite">
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            attribution="&copy; Google Maps"
                            maxZoom={21}
                        />
                    </BaseLayer>
                </LayersControl>

                {/* Groupe pour le dessin */}
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={handleDrawCreated}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            polyline: false,
                            polygon: true, // Activer uniquement le dessin de polygones
                            marker: false
                        }}
                    />
                </FeatureGroup>

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
