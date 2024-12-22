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
      <div className="grid md:grid-cols-3  gap-3 w-11/12 px-6 py-10 mx-auto  ">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
