import { format } from "date-fns";
import { NavLink } from "react-router-dom";

const FoodCard = ({ food }) => {
  const {
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    deadline,
    additionalNotes,
    donatorName,
    email,
    foodStatus,
    _id,
  } = food || {};

  return (
    <div className=" ">
      <div className=" max-w-xs  mx-auto rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <figure>
          <img
            src={foodImage}
            alt={foodName}
            className="object-cover object-center w-full h-48 rounded-t-md  dark:bg-gray-500"
          />
        </figure>
        <div className="md:ml-3 ml-1 flex flex-col items-start justify-center">
          <h2 className="card-title text-3xl">{foodName}</h2>
          <div className="flex justify-between gap-4">
            <div>
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {deadline && format(new Date(deadline), "P")}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {new Date(deadline) > new Date() ? (
                  <span className="text-green-600 font-bold">{foodStatus}</span>
                ) : (
                  <span className="text-red-600 font-bold">Expire</span>
                )}
              </p>
            </div>
          </div>
          <div>
            <span className="font-semibold ">Food Quantity:</span>{" "}
            {foodQuantity}
          </div>
          <div className=""></div>
          <div className=" flex flex-col gap-y-2 text-left">
            <div className="">
              <span className="font-semibold ">Pickup Location:</span>{" "}
              {pickupLocation}
            </div>
          </div>
          <div>
            <NavLink to={`/foodDetails/${_id}`}>
              <button className="btn text-gray-100 btn-primary bg-gray-700 rounded-md hover:bg-gray-600 font-bold my-3">
                See Details
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
