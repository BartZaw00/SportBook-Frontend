import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/sharedComponents";
import SportFacilityBox from "./sportFacilitiesContent/SportFacilityBox";

const SportFacilities = ({
  sportFacilities,
  setSportFacilities,
  isLoading,
  location,
}) => {
  const navigate = useNavigate();

  const handleSportFacilityClick = (id) => {
    navigate(`/sport-facility/${id}`);
  };

  // useEffect(() => {
  //   if (location !== null) {
  //     const updatedSportFacilities = updateSportFacilities();
  //     setSportFacilities(updatedSportFacilities);
  //   }
  // }, []);

  // const updateSportFacilities = () => {
  //   const updatedSportFacilities = sportFacilities.map((facility) => {
  //     const userLocation = L.latLng(location?.latitude, location?.longitude);
  //     const sportFacilityLocation = L.latLng(facility.latitude, facility.longitude);
  //     const distanceInMeters = userLocation.distanceTo(sportFacilityLocation);
  //     const distanceInKilometers = distanceInMeters / 1000;
  //     return { ...facility, distance: distanceInKilometers.toFixed(2) };
  //   });
  //   return updatedSportFacilities;
  // };

  return (
    <main className="mt-6 mb-12 px-20 2xl:px-10 xl:px-8 lg:px-6 md:px-4 grid grid-cols-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-6 gap-y-8">
      {isLoading ? (
        <LoadingSpinner />
      ) : sportFacilities.length === 0 ? (
        <p className="flex justify-center col-span-full text-gray-500">
          Brak obiektów sportowych w tej kategorii.
        </p>
      ) : (
        sportFacilities.map((sportFacility) => (
          <SportFacilityBox
            key={sportFacility.sportFacilityId}
            sportFacility={sportFacility}
            distance={sportFacility.distance}
            onClick={() =>
              handleSportFacilityClick(sportFacility.sportFacilityId)
            }
          />
        ))
      )}
    </main>
  );
};

export default SportFacilities;
