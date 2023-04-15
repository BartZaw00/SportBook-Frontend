import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, InfoBox } from "@react-google-maps/api";
import MapSportFacilityBox from "./mapContent/MapSportFacilityBox";
import { useNavigate } from "react-router-dom";

const Map = ({ sportFacilities }) => {
  const navigate = useNavigate();

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 51.763, lng: 19.457 });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    createMarkers();
  }, [sportFacilities]);

  useEffect(() => {
    if (markers.length > 0 && !Array.isArray(sportFacilities)) {
      setCenter({ lat: markers[0].lat, lng: markers[0].lng });
    }
  }, [markers, sportFacilities]);

  const createMarkers = () => {
    let facilities = sportFacilities;
    if (!Array.isArray(sportFacilities)) {
      facilities = [sportFacilities];
    }
    const newMarkers = facilities.map((facility) => {
      const id = facility.sportFacilityId;
      const lat = facility.latitude;
      const lng = facility.longitude;
      const name = facility.address;
      return { id, lat, lng, name };
    });
    setMarkers(newMarkers);
  };

  const onMarkerClick = (marker) => {
    if (markers.length > 0 && !Array.isArray(sportFacilities)) {
      return;
    }
    setSelectedMarker(marker);
    setCenter({ lat: marker.lat - 0.03, lng: marker.lng });
  };

  const handleSportFacilityClick = (id) => {
    navigate(`/sport-facility/${id}`);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12.3}
      onClick={() => setSelectedMarker(null)}
      onDrag={() => setSelectedMarker(null)}
    >
      {markers.map((marker) => (
        <MarkerF
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => onMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoBox
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          options={{ closeBoxURL: "", enableEventPropagation: true }}
        >
          <MapSportFacilityBox
            sportFacility={sportFacilities.find(
              (facility) => facility.sportFacilityId === selectedMarker.id
            )}
            onClick={() => handleSportFacilityClick(selectedMarker.id)}
          />
        </InfoBox>
      )}
    </GoogleMap>
  );
};

export default Map;
