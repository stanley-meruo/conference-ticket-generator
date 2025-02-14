import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import TicketSelection from "../components/TicketSelection";
import AttendeeDetails from "../components/AttendeeDetails";
import TicketConfirmation from "../components/TicketConfirmation";
import NavBar from "../components/NavBar";


const TicketPage = () => {
  const [step, setStep] = useState(1);
  const stepLabels = ["Ticket Selection", "Attendee Details", "Ready"];

  const [ticket, setTicket] = useState(() => {
    return JSON.parse(localStorage.getItem("ticket")) || null;
  });

  const [attendee, setAttendee] = useState(() => {
    return JSON.parse(localStorage.getItem("attendee")) || null;
  });

  useEffect(() => {
    if (ticket) setStep(2);
    if (attendee) setStep(3);
  }, []);

  useEffect(() => {
    localStorage.setItem("ticket", JSON.stringify(ticket));
  }, [ticket]);

  useEffect(() => {
    localStorage.setItem("attendee", JSON.stringify(attendee));
  }, [attendee]);

  useEffect(() => {
    const proceeded = localStorage.getItem("proceeded");
    if (!proceeded) {
      setStep(1); // Ensure it always starts at Step 1 on refresh
    }
  }, []);

  const nextStep = (data) => {
    if (step === 1) {
      if (!data) {
        return;
      }
      setTicket(data);
      localStorage.setItem("proceeded", "true"); // Mark user has proceeded manually
      setStep(2);
    } else if (step === 2) {
      if (!data?.name || !data?.email) {
        return;
      }
      setAttendee(data);
      setStep(3);
    }
  };

  const prevStep = () => {
    localStorage.removeItem("proceeded");
    setStep((prev) => prev - 1);
  };

  return (
    <div className="body min-h-screen flex flex-col justify-center items-center px-4 py-8 xs:px-14 sm:px-24 md:px-16">
      <NavBar />

      <div className="w-full bg-shade2 bg-opacity-60 p-5 my-8 border-2 border-secondary rounded-2xl sm:p-6 md:bg-primary md:bg-opacity-60 md:p-8 md:w-[600px] lg:w-[730px] lg:p-12 xxl:w-[780px]">
        <ProgressBar step={step} stepLabels={stepLabels} />

        <div
          className={`md:bg-shade2 md:bg-opacity-60 md:border-secondary md:border md:p-6 md:rounded-2xl ${
            step === 3 ? "hidden" : ""
          }`}
        >
          {step === 1 && <TicketSelection onNext={nextStep} />}
          {step === 2 && (
            <AttendeeDetails onNext={nextStep} onBack={prevStep} />
          )}
        </div>

        {step === 3 && (
          <TicketConfirmation
            attendee={attendee}
            ticket={ticket}
            onBack={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default TicketPage;
