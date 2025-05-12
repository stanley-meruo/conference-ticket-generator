import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";


const AttendeeDetails = ({ onNext, onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    photo: "",
    project: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePhotoUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setErrors((prev) => ({ ...prev, photo: "" }));

    const options = {
      maxSizeMB: 0.5, // Compress to max 0.5MB
      maxWidthOrHeight: 800, // Resize to max width or height of 800px
      useWebWorker: true, // Speed up compression
    };

    try {
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", "ticket_upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/gallerycloud/image/upload",
        formData
      );

      if (response.data.secure_url) {
        setPhotoUrl(response.data.secure_url);
      } else {
        setErrors((prev) => ({
          ...prev,
          photo: "Image upload failed. Try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, photo: "Error uploading image." }));
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handlePhotoUpload(file);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(photoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleNext = () => {
    let newErrors = { name: "", email: "", photo: "", project: "" };

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim() || !validateEmail(email))
      newErrors.email = "Enter a valid email.";
    if (!photoUrl) newErrors.photo = "Profile photo is required.";
    if (project.trim().split(/\s+/).length < 10)
      newErrors.project = "Special Request not more than 20 words.";

    setErrors(newErrors);

    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.photo &&
      !newErrors.project
    ) {
      onNext({ name, email, photoUrl, project });
    }
  };

  return (
    <div className="text-white rounded-2xl w-full font-roboto">
      <div className="mb-4">
        {/* Upload Profile Photo */}
        <div className="border border-secondary bg-shade bg-opacity-30 rounded-2xl p-6">
          <p className=" block mb-2">Upload Profile Photo</p>

          <div className="xs:bg-primary xs:my-6">
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-[230px] border-4 border-button rounded-2xl bg-secondary relative transition-transform hover:scale-105 duration-300 hover:bg-opacity-75 xs:w-60 xs:mx-auto">
              {uploading ? (
                <FaSpinner className="animate-spin text-3xl mx-auto text-white" />
              ) : photoUrl ? (
                <p>Image Uploaded</p>
              ) : (
                <>
                  <AiOutlineCloudDownload className="text-3xl mx-auto" />
                  <p className="text-center mt-2 px-6">
                    Drag & drop or click to upload
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Display Uploaded URL */}
        {photoUrl && (
          <div className="mt-4 grid p-3 border border-secondary rounded-lg w-72 bg-transparent xs:w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm text-white truncate w-60 xs:w-64 md:w-80">
                {photoUrl}
              </p>
              <button className="text-button" onClick={handleCopyUrl}>
                <FiCopy className="text-lg" />
              </button>
            </div>
          </div>
        )}

        {errors.photo && (
          <p className="text-red-500 text-xs mt-1 animate-pulse sm:text-sm">
            {errors.photo}
          </p>
        )}
      </div>

      <div className="w-full h-1 bg-secondary my-8"></div>

      {/* Name Input */}
      <div className="mb-6">
        <label className="block mb-2">Enter your name</label>
        <input
          type="text"
          className={`w-full p-3 rounded-lg bg-transparent border text-white focus:outline-none focus:border-2 focus:border-button ${
            errors.name ? "border-red-500" : "border-secondary"
          }`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1 animate-pulse sm:text-sm">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <label className="block mb-2">Enter your email *</label>
        <input
          type="email"
          placeholder="✉️ hello@avioflagos.io"
          className={`w-full p-3 rounded-lg bg-transparent border text-white focus:outline-none focus:border-2 focus:border-button ${
            errors.email ? "border-red-500" : "border-secondary"
          }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 animate-pulse sm:text-sm">
            {errors.email}
          </p>
        )}
      </div>

      {/* Request Input */}
      <div className="mb-6">
        <label className="block mb-2">About the Project</label>
        <textarea
          className={`w-full p-2 rounded-lg bg-transparent border text-white focus:outline-none focus:border-2 focus:border-button resize-none ${
            errors.project ? "border-red-500" : "border-secondary"
          }`}
          rows="3"
          cols="10"
          placeholder="Textarea"
          value={project}
          onChange={(e) => {
            setProject(e.target.value);
            setErrors((prev) => ({ ...prev, project: "" }));
          }}
        ></textarea>
        {errors.project && (
          <p className="text-red-500 text-xs mt-1 animate-pulse sm:text-sm">
            {errors.project}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="font-jeju grid gap-4 mb-2 md:flex md:flex-row-reverse md:items-center">
        <button
          className="bg-button px-4 py-3 w-full rounded-lg border-2 border-color"
          onClick={handleNext}
        >
          Get My Free Ticket
        </button>
        <button
          className="px-4 py-3 w-full rounded-lg bg-transparent border-2 border-color text-button hover:bg-button hover:text-white"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AttendeeDetails;
