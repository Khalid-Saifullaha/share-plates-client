import React from "react";

const AboutUs = () => {
  return (
    <div className="w-10/12 mx-auto mt-7">
      <h2 className="text-center font-bold text-2xl">About Us</h2>
      <div className="space-y-3 mt-3">
        <h2 className=" font-bold">
          Welcome to SharePlate, the Ultimate Food Discovery Platform!
        </h2>
        <p>
          At SharePlate, we believe that food is more than just nourishment—it's
          an experience, a culture, and a connection to the world around us. Our
          mission is to bring people closer to the flavors they love and help
          them discover new culinary delights.
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="font-bold">Our Story</h2>
        <p>
          Founded in 2021 by a group of food enthusiasts, SharePlate was born
          out of a shared passion for exploring diverse cuisines and making them
          accessible to everyone. Whether you’re craving your favorite local
          dishes or searching for hidden gems in a faraway city, we’re here to
          make your food journey unforgettable.
        </p>
      </div>
      <div className="space-y-3 mt-3">
        <h2 className="font-bold">What We Offer</h2>

        <li>
          Extensive Food Listings: Discover a wide variety of dishes,
          restaurants, and cuisines.
        </li>
        <li>
          Personalized Recommendations: Get suggestions based on your tastes and
          preferences.
        </li>
        <li>
          Trending and Featured Foods: Stay updated on the hottest food trends
          and must-try dishes.
        </li>
        <li>
          Community Connection: Share reviews, recipes, and experiences with a
          vibrant community of food lovers.
        </li>
      </div>
      <div className="space-y-3 my-3">
        <h2 className="font-bold">Our Mission</h2>
        <p>
          We aim to create a world where food discovery is effortless and
          joyful. By connecting users to the best food options and experiences,
          we hope to inspire a deeper appreciation for culinary diversity and
          bring people closer together—one bite at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
