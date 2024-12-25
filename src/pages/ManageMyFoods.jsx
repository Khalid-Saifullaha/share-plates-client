import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import DatePicker from "react-datepicker";

const ManageMyFoods = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const [selectedFood, setSelectedFood] = useState(null);
  const [food, setFood] = useState({});

  const {
    data: foods,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/foods/${user?.email}`);
      return data;
    },
  });

  // Fetch food data based on the current `id` for update
  useEffect(() => {
    const fetchFoodData = async () => {
      if (id) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/food/${id}`
        );
        setFood(data);
        setStartDate(new Date(data.deadline));
      }
    };
    fetchFoodData();
  }, [id]);

  // Delete functionality
  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/food/${foodId}`);
      toast.success("Data Deleted Successfully!");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const modernDelete = (foodId) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(foodId);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
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

    // console.log("Submitting Data:", formData);

    try {
      // Perform the update request
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update/${selectedFood._id}`,
        formData
      );

      // Close the modal
      setSelectedFood(null);

      // Refetch the food list to reflect the changes
      refetch();

      toast.success("Data updated successfully!");
    } catch (err) {
      // console.error("Error in saving data:", err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">My Posted Foods</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {foods.length} Food
        </span>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-200">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-900">
                      Food Name
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-900">
                      Food Quantity
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-900">
                      Delete
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-900">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {food.foodName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {food.foodQuantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <button
                          onClick={() => modernDelete(food._id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() => setSelectedFood(food)}
                          className="text-gray-500 hover:text-yellow-500"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
              <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                  Update Food
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
                        defaultValue={selectedFood?.foodName}
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
                        defaultValue={selectedFood?.foodImage || ""}
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
                        defaultValue={selectedFood?.foodQuantity}
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
                        defaultValue={selectedFood?.pickupLocation || ""}
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
                      <label
                        className="text-gray-700"
                        htmlFor="additionalNotes"
                      >
                        Additional Notes
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        defaultValue={selectedFood?.additionalNotes}
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
                        defaultValue={selectedFood?.foodStatus}
                        disabled={true}
                        className="block w-full px-4 py-2 mt-2 border bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setSelectedFood(null)}
                      className="px-4 py-2 bg-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Update Food
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageMyFoods;
