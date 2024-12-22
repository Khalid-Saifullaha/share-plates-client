import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchFoodData();
  }, []);
  const fetchFoodData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/featured-foods`
    );
    setFoods(data);
  };
  console.log(foods);
  return (
    <div className="">
      <div>
        <Carousel></Carousel>
      </div>
    </div>
  );
};

export default Home;
