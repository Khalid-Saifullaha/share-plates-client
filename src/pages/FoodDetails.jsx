import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { compareAsc, format } from "date-fns";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FoodDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    const { data } = await axiosSecure.get(`/food/${id}`);
    setFood(data);
    setStartDate(new Date(data.deadline));
  };

  const {
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    deadline,
    additionalNotes,
    donatorName,
    email,
    donatorPhoto,
    foodStatus,
    _id,
  } = food || {};

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const donatorName = form.donatorName.value;
    const pickupLocation = form.pickupLocation.value;
    const expireDeadline = form.expireDeadline.value;
    const requestDate = form.requestDate.value;

    const jobId = _id;

    // 1. Check bid permissions validation
    if (user?.email === email) return toast.error("Action not permitted!");

    // 2. Deadline crossed validation
    if (compareAsc(new Date(), new Date(deadline)) === 1)
      return toast.error("Deadline Crossed, Food Unavailable");

    const requesData = {
      donatorName,
      pickupLocation,
      requestDate,
      expireDeadline,
      jobId,
      email,
    };

    try {
      // 1. make a post request
      const { data } = await axiosSecure.post(`/add-request`, requesData);
      // 2. Reset form
      form.reset();
      // 3. Show toast and navigate
      toast.success("Food Request Successful!!!");
      setIsModalOpen(false);
      navigate("/dashboard/my-food-request");
    } catch (err) {
      toast.error("You have already placed a request on this food!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto">
      {/* Job Details */}
      <div className="flex-1 px-4 py-7 bg-white rounded-md shadow-md">
        <figure>
          <img
            src={foodImage}
            alt="Shoes"
            className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
          />
        </figure>
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800">
            <p>
              <span className="font-semibold">Deadline:</span>{" "}
              {deadline && format(new Date(deadline), "P")}
            </p>
          </span>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {new Date(deadline) > new Date() ? (
              <span className="text-green-600 font-bold">{foodStatus}</span>
            ) : (
              <span className="text-red-600 font-bold">Unavailable</span>
            )}
          </p>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">
            {foodName}
          </h1>

          <p className="mt-2 text-lg text-gray-600">{additionalNotes}</p>
          <div className="flex items-center justify-between">
            <p>Location: {pickupLocation}</p>
            <p>Quantity: {foodQuantity}</p>
          </div>
          <p className="mt-6 text-sm font-bold text-gray-600">
            Food Donator Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm text-gray-600">Name: {donatorName}</p>
              <p className="mt-2 text-sm text-gray-600">Email: {email}</p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={donatorPhoto} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-warning"
            onClick={() => setIsModalOpen(true)}
          >
            Request Food
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize ">
              Add Food
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-1 mt-4 sm:grid-cols-2">
                {/* Food Name */}
                <div>
                  <label className="text-gray-700" htmlFor="foodName">
                    Food Name
                  </label>
                  <input
                    id="foodName"
                    name="foodName"
                    defaultValue={foodName}
                    disabled={true}
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
                    defaultValue={foodImage}
                    disabled={true}
                    type="url"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    required
                  />
                </div>

                {/* Food Id */}
                <div>
                  <label className="text-gray-700" htmlFor="foodName">
                    Food Id
                  </label>
                  <input
                    id="foodName"
                    name="foodName"
                    defaultValue={_id}
                    disabled={true}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 " htmlFor="UserEmailAddress">
                    User Email
                  </label>
                  <input
                    id="userEmailAddress"
                    defaultValue={user?.email}
                    disabled={true}
                    type="email"
                    name="userEmail"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
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
                    defaultValue={foodQuantity}
                    disabled={true}
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
                    defaultValue={pickupLocation}
                    disabled={true}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    required
                  />
                </div>

                {/* Expiration Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Expiration Date</label>
                  <input
                    id="expireDeadline"
                    name="expireDeadline"
                    defaultValue={deadline && format(new Date(deadline), "P")}
                    disabled={true}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    required
                  />
                </div>

                {/* Request Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Request Date</label>
                  <input
                    id="requestDate"
                    name="requestDate"
                    defaultValue={format(new Date(), "P")}
                    disabled={true}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
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
                    defaultValue={additionalNotes}
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
                    defaultValue={donatorName}
                    disabled={true}
                    className="block w-full px-4 py-2 mt-2 border bg-gray-100 rounded-md"
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

              <div>
                <label className="text-gray-700 " htmlFor="emailAddress">
                  Donator Email Address
                </label>
                <input
                  id="emailAddress"
                  defaultValue={email}
                  disabled={true}
                  type="email"
                  name="donatorEmail"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div className="flex justify-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Requested Food
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
