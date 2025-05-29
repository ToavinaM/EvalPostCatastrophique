import React, { useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
    FeatureGroup,
    useMap
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet'; // ✅ Ajouté pour le geocoder
import { useDispatch } from 'react-redux'; // Importer le dispatch de Redux
// import { setRegionInfo } from './redux/slices/mapSlice'; // Action pour mettre à jour Redux
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // ✅ Style du geocoder
import 'leaflet-control-geocoder'; // ✅ Le script du geocoder
import './Map.scss';
import axios from 'axios';
import { setError, setLoading, setRegionInfo } from '../../redux/slices/mapSlice';

const { BaseLayer } = LayersControl;

// ✅ Composant de contrôle de géocodage (barre de recherche)
const GeocoderControl = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Vérifie s'il y a déjà un geocoder sur la carte
        const existingControls = Object.values(map._controls || {});
        const hasGeocoder = existingControls.some(
            control => control instanceof L.Control.Geocoder
        );

        if (hasGeocoder) return;

        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: true,
            geocoder: L.Control.Geocoder.nominatim()
        });

        geocoder
            .on('markgeocode', function (e) {
                const center = e.geocode.center;

                // Supprime tous les marqueurs existants
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker && !layer._popup) {
                        map.removeLayer(layer);
                    }
                });

                // Ajoute le nouveau marqueur
                L.marker(center).addTo(map)
                    .bindPopup(e.geocode.name)
                    .openPopup();

                map.setView(center, 16);
            })
            .addTo(map);

        // Cleanup optionnel
        return () => {
            map.removeControl(geocoder);
        };

    }, [map]);

    return null;
};

const Map = () => {
    const dispatch = useDispatch(); // On récupère le dispatch
    const position = [-18.918175169505677, 47.52107863993858]; // Coordonnées par défaut

    // Fonction pour calculer le centre d'un polygone
    const calculateCenter = (latlngs) => {
        let latSum = 0;
        let lngSum = 0;
        latlngs.forEach(latlng => {
            latSum += latlng.lat;
            lngSum += latlng.lng;
        });
        return { lat: latSum / latlngs.length, lng: lngSum / latlngs.length }; // Moyenne des coordonnées
    };
    const fetchRegionInfo = (center, coordinates) => {
        const { lat, lng } = center;
        dispatch(setLoading()); // Met à jour l'état de chargement
        axios
            .get('https://nominatim.openstreetmap.org/reverse', {
                params: {
                    format: 'json',
                    lat: lat,
                    lon: lng,
                    zoom: 18,  // Niveau de détail de l'information géographique (18 = très détaillé)
                    addressdetails: 1,  // Pour obtenir des informations détaillées sur l'adresse
                }
            })
            .then((response) => {
                console.log(response.data);
                response.data.coordinates = coordinates; // Ajouter les coordonnées au résultat
                dispatch(setRegionInfo(response.data)); // Dispatcher les informations récupérées
            })
            .catch((error) => {
                console.error(error);
                dispatch(setError(error.message)); // Gérer les erreurs
            });
    };

    // Fonction pour gérer le dessin
    const handleDrawCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const coordinates = layer.getLatLngs(); // Récupérer les coordonnées du polygone
            console.log("Coordonnées du polygone :", coordinates);

            // Calculer le centre du polygone
            const center = calculateCenter(coordinates[0]); // On prend le premier tableau de coordonnées
            console.log("Centre du polygone :", center);

            // Appeler l'API pour récupérer les informations de la région à partir du centre du polygone
            fetchRegionInfo(center, coordinates);
        }
    };


    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
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

                {/* ✅ Barre de recherche */}
                <GeocoderControl />

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
                            polygon: true,
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
