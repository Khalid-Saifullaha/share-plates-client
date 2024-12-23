import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AvailableFoods = () => {
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  useEffect(() => {
    fetchAllFoods();
  }, [search]);

  const fetchAllFoods = async () => {
    const { data } = await axiosSecure.get(`/foods?search=${search}`);
    setFoods(data);
  };

  const toggleLayout = () => {
    setIsThreeColumn(!isThreeColumn); // Toggle between true and false
  };
  return (
    <div>
      <div className="flex justify-center my-5">
        <div className="flex justify-center w-80 p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Job Title"
            aria-label="Enter Job Title"
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>
        <div className="text-center flex items-center ml-7">
          <button
            onClick={toggleLayout}
            className="btn text-gray-100 btn-primary bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Change Layout
          </button>
        </div>
      </div>

      <div
        className={`grid gap-3 w-11/12 px-6 py-10 mx-auto ${
          isThreeColumn ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"
        }`}
      >
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
