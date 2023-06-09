import React, { useContext, useState } from "react";
import { ModalContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { deleteReservation } from "../../../services/ReservationService";
import moment from "moment";
import locale from "antd/es/date-picker/locale/pl_PL";
import { FormSelectReservation } from "../../../components/formComponents";
import { DatePicker, TimePicker } from "antd";

const ModalReservationCard = ({
  reservation,
  setIsLoading,
  user,
  fetchReservationsByUser,
  setReservations,
}) => {
  // Extract reservation data
  const { startTime, endTime, sportFacility } = reservation;

  // Format date and time using moment.js library
  const formattedDate = moment(startTime).format("D MMMM YYYY");
  const formattedStartTime = moment(startTime).format("HH:mm");
  const formattedEndTime = moment(endTime).format("HH:mm");

  // Access setIsModalOpen function from ModalContext to close the modal
  const { setIsModalOpen } = useContext(ModalContext);

  // State to track if reservation is currently being deleted
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30");

  const durationOptions = [
    { label: "30 minut", value: "30" },
    { label: "1 godzina", value: "60" },
    { label: "1 godzina 30 minut", value: "90" },
    { label: "2 godziny", value: "120" },
    { label: "2 godziny 30 minut", value: "150" },
    { label: "3 godziny", value: "180" },
  ];

  // Access navigate function from the useNavigate hook to navigate to a different page
  const navigate = useNavigate();

  // Function to show the delete confirmation
  const handleDeleteConfirmation = () => {
    setIsDeleting(true);
  };

  // Function to cancel the delete operation and hide the delete confirmation
  const handleDeleteCancel = () => {
    setIsDeleting(false);
  };

  // Function to delete the reservation and fetch updated reservations data
  const handleDelete = () => {
    setIsDeleting(false);

    // Call the deleteReservation function to delete the reservation
    deleteReservation(reservation.reservationId)
      .then(() => {
        // Set isLoading to true and fetch updated reservation data
        setIsLoading(true);
        setTimeout(
          () =>
            fetchReservationsByUser(user.id).then((data) => {
              setReservations(data);
              setIsLoading(false);
            }),
          800
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setIsDeleting(false));
  };

  // Function to handle when the sport facility photo is clicked
  const handleSportFacilityClick = (id) => {
    // Close the modal
    setIsModalOpen(false);
    // Navigate to the sport facility page using the navigate function
    navigate(`/sport-facility/${id}`);
  };

  const handleSportFacilityChange = () => {};

  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4 sm:px-0">
      <div className="mx-5 flex items-center justify-around gap-16 xl:flex-col xl:items-stretch xl:gap-4">
        <div className="w-[150px] min-w-[150px] xl:w-full sm:min-w-[100px] aspect-[3/2] overflow-hidden">
          <img
            className="w-full h-full rounded-lg cursor-pointer"
            src={sportFacility.photos[0].photoUrl}
            alt="Obiekt Sportowy"
            onClick={() =>
              handleSportFacilityClick(sportFacility.sportFacilityId)
            }
          />
        </div>
        {isEditMode ? (
          <form
            className="flex gap-4"
            onSubmit={() => handleReservationChange()}
          >
            <div className="flex flex-col gap-4 ">
              <label className="text-xs font-medium" htmlFor="date">
                Data:
              </label>
              <DatePicker
                locale={locale}
                id="date"
                onChange={(value) => setDate(value)}
                format="DD.MM.YYYY"
                inputReadOnly={true}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-my-primary bg-white text-gray-900 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-xs font-medium" htmlFor="time">
                Godzina:
              </label>
              <TimePicker
                locale={locale}
                id="time"
                format="HH:mm"
                onChange={(value) => setTime(value)}
                minuteStep={30}
                inputReadOnly={true}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-my-primary bg-white text-gray-900 shadow-sm"
              />
            </div>
            <div>
              <FormSelectReservation
                label="Czas trwania:"
                options={durationOptions}
                onChange={(value) => setDuration(value)}
                value={duration}
                isMediumScreen={true}
              />
            </div>
          </form>
        ) : (
          <div className="flex justify-around gap-16 xl:justify-between xl:gap-4">
            <div className="min-w-[100px] xl:flex-1 xl:text-center">
              <div className="text-lg text-my-gray mb-1 sm:text-base">
                Data:
              </div>
              <span className="text-xs font-bold">{formattedDate}</span>
              <br />
              <span className="text-xs font-bold">
                {formattedStartTime} - {formattedEndTime}
              </span>
            </div>
            <div className="min-w-[105px] xl:flex-1 xl:text-center">
              <div className="text-lg text-my-gray mb-1 sm:text-base">
                Adres:
              </div>
              <span className="text-xs font-bold">{sportFacility.address}</span>
              <br />
              <span className="text-xs font-bold">{sportFacility.city}</span>
            </div>
            <div className="xl:flex-1 xl:text-center sm:hidden">
              <div className="text-lg text-my-gray mb-1">Obiekt:</div>
              <span className="text-xs font-bold">
                {sportFacility.type.name}
              </span>
            </div>
          </div>
        )}
        {isDeleting ? (
          <div className="flex flex-col items-center gap-3 xl:min-h-[80px]">
            <div className="text-center sm:text-sm">
              Czy na pewno chcesz usunąć rezerwację?
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:border-red-800"
                onClick={handleDelete}
              >
                Tak
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-800 focus:border-gray-800"
                onClick={handleDeleteCancel}
              >
                Cofnij
              </button>
            </div>
          </div>
        ) : isEditMode ? (
          <div className="flex gap-3 xl:flex-col">
            <button
              type="button"
              className="px-4 py-2 bg-my-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-my-primary-hover active:bg-my-primary-active"
            >
              Zapisz
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
              onClick={() => setIsEditMode(false)}
            >
              Anuluj
            </button>
          </div>
        ) : (
          <div className="flex gap-3 xl:flex-col">
            <button
              type="button"
              className="px-4 py-2 bg-my-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-my-primary-hover active:bg-my-primary-active"
              onClick={() => setIsEditMode(true)}
            >
              Edytuj
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:border-red-800"
              onClick={handleDeleteConfirmation}
            >
              Usuń
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalReservationCard;
