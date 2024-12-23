import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import Contact from "./Contact";

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
  // console.log(foods);
  return (
    <div className="">
      <div>
        <Carousel></Carousel>
      </div>
      <div className="   text-black ">
        <h1 className="text-4xl font-bold text-center">Featured Foods</h1>
      </div>
      <div className="grid md:grid-cols-3  gap-3 w-11/12 px-6 py-10 mx-auto  ">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
      <Contact></Contact>
    </div>
  );
};

export default Home;
