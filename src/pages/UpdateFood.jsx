import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFoodData();
  }, [id]);
  const fetchFoodData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/food/${id}`
    );
    setFood(data);
    setStartDate(new Date(data.deadline));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const email = form.email.value;
    const donatorName = form.donatorName.value;
    const deadline = startDate;
    const pickupLocation = form.pickupLocation.value;
    const additionalNotes = form.additionalNotes.value;
    const foodQuantity = parseFloat(form.foodQuantity.value);
    const foodStatus = form.foodStatus.value;

    const formData = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      deadline,
      additionalNotes,
      donatorName,
      email,
      foodStatus,
    };

    try {
      // 1. make a post request
      await axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`, formData);
      // 2. Reset form
      form.reset();
      // 3. Show toast and navigate
      toast.success("Data Added Successfully!!!");
      navigate("/manage-my-foods");
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
    // make post request
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Add Food
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Food Name */}
            <div>
              <label className="text-gray-700" htmlFor="foodName">
                Food Name
              </label>
              <input
                id="foodName"
                name="foodName"
                defaultValue={food.foodName}
                type="text"
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                required
              />
            </div>

            {/* Food Image */}
            <div>
              <label className="text-gray-700" htmlFor="foodImage">
                Food Image URL
              </label>
              <input
                id="foodImage"
                name="foodImage"
                defaultValue={food.foodImage}
                type="url"
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                required
              />
            </div>

            {/* Food Quantity */}
            <div>
              <label className="text-gray-700" htmlFor="foodQuantity">
                Food Quantity
              </label>
              <input
                id="foodQuantity"
                name="foodQuantity"
                defaultValue={food.foodQuantity}
                type="number"
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                required
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="text-gray-700" htmlFor="pickupLocation">
                Pickup Location
              </label>
              <input
                id="pickupLocation"
                name="pickupLocation"
                defaultValue={food.pickupLocation}
                type="text"
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                required
              />
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Expiration Date</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="col-span-2">
              <label className="text-gray-700" htmlFor="additionalNotes">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                defaultValue={food.additionalNotes}
                className="block w-full px-4 py-2 mt-2 border rounded-md"
              ></textarea>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="donatorName">
                Donator Name
              </label>
              <input
                id="donatorName"
                name="donatorName"
                type="text"
                defaultValue={user?.displayName}
                disabled={true}
                className="block w-full px-4 py-2 mt-2 border bg-gray-100 rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                defaultValue={user?.email}
                disabled={true}
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            {/* Food Status */}
            <div>
              <label className="text-gray-700" htmlFor="foodStatus">
                Food Status
              </label>
              <input
                id="foodStatus"
                name="foodStatus"
                type="text"
                defaultValue="available"
                disabled={true}
                className="block w-full px-4 py-2 mt-2 border bg-gray-100 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Add Food
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateFood;
