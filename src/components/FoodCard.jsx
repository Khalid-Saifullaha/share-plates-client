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
  } = food || {};
  return (
    <div className="">
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <figure>
          <img
            src={foodImage}
            alt="Shoes"
            className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
          />
        </figure>
        <div className="md:ml-3 ml-1 flex flex-col items-start justify-center">
          <h2 className="card-title text-3xl">{foodName}</h2>
          <div className="flex justify-between gap-4">
            <div>
              {" "}
              <p>
                <span className="font-semibold ">Deadline:</span>{" "}
                {format(new Date(deadline), "P")}
              </p>
            </div>
            <div>
              <p className="bg-blue-100 px-1 ml-9 rounded-2xl">{foodStatus}</p>
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
            <NavLink to={`/foodDetails/:id`}>
              <button className="btn btn-primary text-white font-bold my-3">
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
