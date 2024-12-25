import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AvailableFoods = () => {
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchAllFoods();
  }, [search]);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axiosSecure.get(`/foods?search=${search}`);
      // Ensure foods is an array
      if (Array.isArray(data.searchedFoods)) {
        setFoods(data.searchedFoods);
      } else if (Array.isArray(data.allFoods)) {
        setFoods(data.allFoods);
      } else {
        setFoods([]);
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoods([]);
    }
  };

  const toggleLayout = () => {
    setIsThreeColumn(!isThreeColumn);
  };

  const handleSort = () => {
    const sortedFoods = [...foods].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFoods(sortedFoods);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div className="flex justify-center my-5">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="flex justify-center w-80 p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Food Name"
              aria-label="Enter Food Name"
            />
            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
          <div className="text-center flex items-center">
            <button
              onClick={toggleLayout}
              className="btn text-gray-100 btn-primary bg-gray-700 rounded-md hover:bg-gray-600"
            >
              Change Layout
            </button>
          </div>
          <div>
            <button
              onClick={handleSort}
              className="btn text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600"
            >
              Sort by Food Expire Date (
              {sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-gray-700 mt-10 text-3xl font-bold">
        All Available Foods
      </div>

      <div
        className={`grid gap-3 w-11/12 px-6 py-10 mx-auto ${
          isThreeColumn ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {foods.length > 0 ? (
          foods.map((food) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center">No foods available.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
