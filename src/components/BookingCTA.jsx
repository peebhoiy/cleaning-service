import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingCTA() {
  const { handleBookAppointment } = useBooking();

  return (
    <section className="booking-cta-section" aria-label="Book a Cleaning Service Today">
      <div className="container">
        <div className="booking-cta-box">
          <div className="booking-cta-left">
            <div className="booking-cta-icon-box" aria-hidden="true">
              <Calendar size={32} />
            </div>
            <div className="booking-cta-text">
              <h2>Ready for a Cleaner, Healthier Space?</h2>
              <p>Book your cleaning appointment today and experience the difference with Cleaning Service.</p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-navy booking-cta-btn"
            onClick={handleBookAppointment}
          >
            <Calendar size={18} />
            <span>Book Appointment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

