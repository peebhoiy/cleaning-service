import React, { createContext, useContext, useState } from 'react';
import BookingDialog from '../components/BookingDialog';

const BookingContext = createContext({
  handleBookAppointment: () => {},
  openBookingDialog: () => {},
  closeBookingDialog: () => {},
  isDialogOpen: false
});

export function BookingProvider({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBookAppointment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsDialogOpen(true);
  };

  return (
    <BookingContext.Provider
      value={{
        handleBookAppointment,
        openBookingDialog: () => setIsDialogOpen(true),
        closeBookingDialog: () => setIsDialogOpen(false),
        isDialogOpen
      }}
    >
      {children}
      <BookingDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
