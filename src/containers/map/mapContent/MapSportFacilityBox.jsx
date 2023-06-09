import React, { useEffect, useState } from "react";
import L from "leaflet";

const MapSportFacilityBox = ({ sportFacility, handleSportFacilityClick, location, selectedMarker }) => {
  // distance state for displaying distance between user and sport facility
  const [distance, setDistance] = useState(-1);

  // calculate distance between user and sport facility when location or selected marker change
  useEffect(() => {
    const userLocation = L.latLng(location?.latitude, location?.longitude);
    const sportFacilityLocation = L.latLng(location?.latitude, sportFacility?.longitude);

    if (location !== null) {
      const distanceInMeters = userLocation.distanceTo(sportFacilityLocation);
      const distanceInKilometers = distanceInMeters / 1000;
      setDistance(distanceInKilometers);
    }
  }, [location, selectedMarker]);

  const handleTouchEnd = () => {
    handleSportFacilityClick();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative w-[250px] md:w-[150px] flex flex-col gap-1 cursor-pointer bg-white rounded-xl overflow-hidden"
      onClick={handleSportFacilityClick}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className="relative aspect-[643/611] overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full bg-my-sport-facility-overlay"></div>
        <img
          className="h-full w-full object-cover"
          src={sportFacility.photos[0].photoUrl}
          alt="sport facility"
        />
      </div>
      <div className="flex flex-col gap-px p-1">
        <div className="flex justify-between">
          <span className="font-semibold text-sm">{`${sportFacility.address}, ${sportFacility.city}`}</span>
          {distance >= 0 ? (
            <span className="text-sm">{sportFacility.distance} km</span>
          ) : (
            <span className="text-sm">??? km</span>
          )}
        </div>
        <span className="font-light text-sm">{sportFacility.type.name}</span>
      </div>
    </div>
  );
};

export default MapSportFacilityBox;
