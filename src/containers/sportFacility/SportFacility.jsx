import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GiGrass } from "react-icons/gi";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { LoadingSpinner } from "../../components/sharedComponents";
import {
  SportFacilityCalendar,
  SportFacilityDetail,
  SportFacilityGallery,
  SportFacilityHeader,
  SportFacilityReservationForm,
} from "./sportFacilityContent";
import Map from "../map/Map";
import useAuth from "../../hooks/useAuth";

const SportFacility = ({ id, isLoading, setIsLoading }) => {
  const { user } = useAuth();

  // State to determine if sport facility is clicked
  const [isClicked, setIsClicked] = useState(false);

  // State to store sport facility data
  const [sportFacility, setSportFacility] = useState("");

  // State to store reservation data
  const [reservationData, setReservationData] = useState({
    sportFacilityID: id,
    userID: user?.id,
  });

  // State to determine if the calendar needs to be updated
  const [shouldUpdateCalendar, setShouldUpdateCalendar] = useState(false);

  // Update reservationData whenever the SportFacilityID changes
  useEffect(() => {
    setReservationData((prevData) => ({
      ...prevData,
      sportFacilityID: id,
    }));
  }, [id]);

  // Update reservationData whenever the UserID changes
  useEffect(() => {
    setReservationData((prevData) => ({
      ...prevData,
      userID: user?.id,
    }));
  }, [user?.id]);

  // Fetch sportFacilityData when reservationData changes
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SPORT_FACILITY_URL}/getById?sportFacilityID=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSportFacility(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [reservationData]);

  // Toggle isClicked when Sport Facility is clicked
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <main className="mt-28 px-96 2xl:px-60 xl:px-32 lg:px-6 md:px-4 flex flex-col sm:mt-24">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SportFacilityHeader
            name={sportFacility.name}
            type={sportFacility.type.name}
          />
          <div className="mt-2 flex justify-between sm:mt-4">
            <div className="flex items-center gap-4 md:gap-2 sm:flex-1 sm:justify-between">
              <SportFacilityDetail
                icon={MdLocationOn}
                text={sportFacility.address}
              />
              <SportFacilityDetail
                icon={GiGrass}
                text={sportFacility.type.surface}
              />
              <SportFacilityDetail
                icon={IoMdTime}
                text={`${sportFacility.openTime.slice(
                  0,
                  -3
                )} - ${sportFacility.closeTime.slice(0, -3)}`}
              />
            </div>
            {/* <button
              className="px-3 py-2 bg-slate-200 flex items-center gap-2 rounded-full hover:bg-slate-300 active:bg-slate-400 md:text-sm sm:hidden"
              onClick={handleClick}
            >
              Dodaj do ulubionych{" "}
              {isClicked ? <BsSuitHeartFill color="red" /> : <BsSuitHeart />}
            </button> */}
          </div>
          <div className="mt-4">
            <SportFacilityGallery images={sportFacility.photos} />
          </div>
          <section className="mt-12 mb-20 grid grid-cols-3 gap-8 md:grid-cols-1">
            <div className="col-span-2">
              <div className="flex flex-col gap-4">
                <article className="px-2">
                  <h2 className=" text-2xl font-bold">Opis</h2>
                  <p className="mt-4">{sportFacility.description}</p>
                </article>
                <article className="mt-4">
                  <h2 className="px-2 text-2xl font-bold">Rezerwacje</h2>
                  <SportFacilityCalendar
                    id={id}
                    shouldUpdateCalendar={shouldUpdateCalendar}
                    setShouldUpdateCalendar={setShouldUpdateCalendar}
                  />
                </article>
                <article className="mt-4">
                  <h2 className="px-2 text-2xl font-bold">Lokalizacja</h2>
                  <div style={{ height: "450px" }} className="mt-4">
                    <Map sportFacilities={sportFacility} />
                  </div>
                </article>
              </div>
            </div>
            <div className="col-span-1">
              <div className="sticky top-32 px-8 pt-6 pb-10 flex flex-col rounded-2xl bg-my-primary-bg border border-gray-300 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-auto md:w-full md:flex-row md:items-center md:gap-6 md:px-0 md:py-2 md:rounded-none md:z-50">
                <SportFacilityReservationForm
                  sportFacility={sportFacility}
                  reservationData={reservationData}
                  setShouldUpdateCalendar={setShouldUpdateCalendar}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default SportFacility;
