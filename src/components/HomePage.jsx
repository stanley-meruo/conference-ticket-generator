import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../assets/hero.webp"
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const HomePage = () => {
  return (
    <main className="bg-gradient-to-br from-primary via-secondary to-primary min-h-screen px-4 pt-8 xs:px-14 sm:px-24 md:px-16">
      <NavBar />

      <main className="text-white relative w-full grid text-darkBlue pt-8 md:pt-12 lg:flex lg:items-center lg:gap-8 lg:pt-24 xl:gap-16">
        <div className="z-10 lg:w-[480px]">
          <h1 className="text-4xl font-black leading-[125%] sm:leading-[128%] sm:text-[46px] md:text-[50px] xl:text-[56px] xl:leading-[130%] xxl:text-[60px]">
            TECHEMBER <br/>FEST "25
            <br />
            <span className="relative after:w-[120%] after:h-full after:bg-button after:block after:absolute after:-z-10 after:top-1 after:-rotate-2">
              Now Here
            </span>{" "}
          </h1>

          <div className="my-11">
            <p className="font-semibold my-5 sm:text-lg xl:text-xl">
              Get Your Tickets to Secure a Spot in this Event
            </p>
            <Link to="/ticket">
            <button
              className=" bg-button px-8 py-1 rounded-lg border-2 border-button hover:bg-color hover:border-white">
              <HiOutlineArrowLongRight className="text-xl" />
            </button>
            </Link>
          </div>
        </div>

        <div className="">
            <img src={Hero} alt="Tech Hero Image" className="lg:w-[650px] xl:w-[780px] xxl:w-[880px]"/>
        </div>
      </main>

    </main>
  );
};
export default HomePage;
