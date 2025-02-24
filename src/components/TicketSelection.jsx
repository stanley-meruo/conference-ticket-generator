import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketSelection = ({ onNext }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const tickets = [
    { id: "regular", name: "REGULAR ACCESS", price: "Free" },
    { id: "vip", name: "VIP ACCESS", price: "$50" },
    { id: "vvip", name: "VVIP ACCESS", price: "$150" },
  ];

  const handleNext = () => {
    if (!selectedTicket) {
      setError("Please select a ticket type.");
      return;
    }
    if (!quantity) {
      setError("Please select one.");
      return;
    }
    setError("");
    onNext({ ticket: selectedTicket, quantity });
  };

  return (
    <div className="text-white font-roboto">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-primary text-center border-secondary border-2 rounded-2xl py-5">
        <h1 className="font-roadrage text-5xl font-medium pb-2 lg:pt-2">
          Techember Fest "25
        </h1>
        <p className="px-9 pb-8 text-sm mx-auto leading-6 md:px-12 sm:text-base lg:w-96">
          Join us for unforgetable experience at Tech Fest!. Secure your spot
          now.
        </p>
        <div className="text-sm sm:text-base lg:flex lg:justify-center lg:gap-4 lg:px-12">
          <p className="pb-1 xs:pb-2">📍04 Rumens road, Ikoyi, Lagos.</p>
          <p className="hidden lg:flex">||</p>
          <p className="">March 15, 2025 | 7:00PM</p>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-1 bg-secondary my-8"></div>

      {/* Ticket Selection */}
      <h2 className="mb-4">Select Ticket Type:</h2>
      <div>
        <div className="grid gap-3 rounded-2xl border border-secondary p-4 bg-shade md:flex md:items-center lg:gap-4">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              role="button"
              aria-label={`Select ${ticket.name}, price ${ticket.price}, ${ticket.available} tickets available`}
              className={`w-full p-3 mb-2 text-left border rounded-2xl transition-transform hover:scale-105 hover:bg-secondary ${
                selectedTicket === ticket.id
                  ? "bg-secondary border border-button"
                  : "border-button"
              }`}
              onClick={() => {
                setSelectedTicket(ticket.id);
                setError(""); // Clear error when a selection is made
              }}
            >
              <div className="grid gap-2">
                <span className="text-2xl pb-2 font-semibold">
                  {ticket.price}
                </span>
                <span className="text-sm">{ticket.name}</span>
                <p className="text-sm">20/50</p>
              </div>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && !selectedTicket && (
          <p className="text-red-500 text-xs font-light mt-1 animate-pulse sm:text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="my-6">
        <label className="">Number of Tickets</label>
        <select
          aria-label="Select the number of tickets"
          className="w-full p-4 mt-2 bg-transparent border border-secondary rounded-xl focus:outline-none focus:border-2 focus:border-button"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(11).keys()].map((n) => (
            <option key={n} value={n} className="bg-secondary">
              {n}
            </option>
          ))}
        </select>

        {/* Error Message */}
        {error && !quantity && (
          <p className="text-red-500 text-xs font-light mt-1 animate-pulse sm:text-sm">
            {error}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="font-jeju grid gap-4 mb-2 md:flex md:flex-row-reverse md:items-center ">
        <button
          aria-label="Proceed to the next step"
          className=" bg-button px-4 py-3 w-full rounded-lg border-2 border-button hover:bg-color disabled:bg-color"
          onClick={handleNext}
        >
          Next
        </button>
        <button
          aria-label="Cancel ticket selection and return to homepage"
          className="px-4 py-3 w-full rounded-lg bg-transparent text-button border-2 border-button hover:bg-button hover:text-white"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TicketSelection;
