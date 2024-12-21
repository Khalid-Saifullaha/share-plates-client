import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, []);
  const fetchAllFoods = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods`);
    setFoods(data);
  };
  return (
    <div>
      <div className="md:w-[400px] mx-auto my-4 ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full border-slate-600"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
