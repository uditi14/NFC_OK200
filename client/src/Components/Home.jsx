import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
//import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/*<Navbar />*/}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Commuting made easy and fun!
          </h1>
          <p className="primary-text">
            Turning yesterday's hectic schedules and transport into today's optimized travel!
          </p>
          <Link to="/" className="secondary-button">
            Book a Ride
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
