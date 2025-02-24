import Subtract from "/subtract.svg"
import BarCode from "/barcode.svg";
import BarCode0 from "/barcode0.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Success from "../assets/success.gif"


const TicketConfirmation = ({ attendee, ticket }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownloadAndEmail = async () => {
    setLoading(true); // Show loader overlay

    const ticketElement = document.getElementById("ticket-section");
    if (!ticketElement) return console.error("Ticket section not found!");

    try {
      const canvas = await html2canvas(ticketElement, {
        useCORS: true, // Enable cross-origin images
        logging: true, // Enable logging to debug issues
        scale: 2, // Improve image quality
      });
      const imageUrl = canvas.toDataURL("image/png");

      // Create a temporary link for downloading
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `TechemberFest_Ticket.png`; // Ticket filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append(
        "upload_preset",
        "import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET"
      );

      const cloudinaryResponse = await axios.post(
        "import.meta.env.VITE_CLOUDINARY_UPLOAD_URL",
        formData
      );
      const uploadedImageUrl = cloudinaryResponse.data.secure_url;

      // Ensure attendee exists before sending email
      if (!attendee || !attendee.email || !attendee.name) {
        console.error("Attendee details are missing!");
        setLoading(false);
        return;
      }

      // Send email with image URL
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: attendee.email,
          attendee_name: attendee.name,
          subject: "Your Techember Fest '25 Ticket",
          message: `Here is your ticket To Techember Fest 25. Click the link below to view:\n${uploadedImageUrl}`,
          // image_url: uploadedImageUrl,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setLoading(false); // Hide loader
      setSuccess(true); // Show success confirmation

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };


  return (
    <div className="text-white relative font-roboto">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-shade2 bg-opacity-75 z-50">
          <div className="text-white text-lg">
            <FaSpinner className="text-9xl mx-auto animate-spin my-4" />
            Generating Ticket...
          </div>
        </div>
      )}

      {/* Success Confirmation */}
      {success && (
        <div className="fixed inset-0 flex justify-center items-center bg-shade bg-opacity-75 z-50">
          <div className=" text-white text-lg">
            <img
              src={Success}
              alt="Success"
              className="w-24 h-24 mx-auto my-4"
            />
            Ticket Sent to Mail!
          </div>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-xl py-4 font-bold md:text-2xl">
          Your Ticket is Booked!
        </h1>
        <p>You can download or Check your email for a copy</p>
      </div>

      <div id="ticket-section" className="mt-14 relative">
        <img
          src={Subtract}
          alt="Vector Ticket Frame"
          className="w-[300px] h-auto m-auto xs:h-[600px] "
        />

        <div className="absolute inset-0 rounded-2xl my-4 border-button border-2 w-[260px] h-[435px] mx-auto xxs:h-[455px] xxs:">
          <div className="text-center">
            <p className="text-[32px] font-medium font-roadrage">
              Techember Fest "25
            </p>
            <p className="text-xs pb-1">📍04 Rumens road, Ikoyi, Lagos</p>
            <p className="text-xs">📆March 15, 2025 | 7:00PM</p>
          </div>

          {/* Image Upload */}
          <div>
            <img
              src={attendee.photoUrl}
              alt="Profile"
              className="w-[130px] h-[130px] rounded-2xl border-4 border-button mx-auto my-4"
            />
          </div>

          {/* Ticket Selection & Attendee Details */}
          <div className="mx-2 border border-secondary rounded-xl text-xs xs:pb-4 xxs:pb-4">
            <div className="grid grid-cols-2 p-1">
              <div className="grid p-1 text-gray-400 border-secondary border border-t-0 border-l-0 border-b-[0.5px] border-r-[0.5px]">
                Enter your name
                <span className="text-white font-semibold py-1">
                  {attendee.name}
                </span>
              </div>
              <div className="grid p-1 text-gray-400 border border-secondary border-t-0 border-r-0 border-b-[0.5px] border-l-[0.5px]">
                Enter your email*
                <span className="text-white font-semibold py-1 overflow-hidden">
                  {attendee.email}
                </span>
              </div>
              <div className="grid p-1 text-gray-400 border border-secondary border-b border-l-0 border-t-[0.5px] border-r-[0.5px]">
                Ticket Type :
                <span className="text-white font-semibold py-1 uppercase">
                  {ticket.ticket}
                </span>
              </div>
              <div className="grid p-1 text-gray-400 border border-secondary border-b border-r-0 border-t-[0.5px] border-l-[0.5px]">
                Ticket for :
                <span className="text-white font-semibold py-1">
                  {ticket.quantity}
                </span>
              </div>
            </div>
            {attendee.project && (
              <div className="grid p-2 text-gray-400">
                Special Request :
                <span className="text-white py-1">{attendee.project}</span>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <img
            src={BarCode}
            alt="Barcode for mobile"
            className="lg:hidden mx-auto max-w-full h-auto relative bottom-24"
          />
          <img
            src={BarCode0}
            alt="Barcode for Desktop"
            className="hidden lg:block mx-auto max-w-full h-auto relative bottom-24"
          />
        </div>
      </div>

      {/* Confirm Button */}
      <div className="font-jeju grid gap-4 mb-2 md:flex md:flex-row-reverse md:items-center">
        <button
          className="bg-button w-full px-4 py-3 rounded-lg text-white border-2 border-button hover:border-white"
          onClick={handleDownloadAndEmail}
        >
          Download Ticket
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="px-4 py-3 w-full rounded-lg bg-transparent border-2 border-button text-button hover:bg-button hover:border-white hover:text-white"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketConfirmation;
