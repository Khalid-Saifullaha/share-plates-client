import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import useAxiosSecure from "../hooks/useAxiosSecure";

const MyFoodRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foodsRequest, setFoodsRequest] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, [user]);
  const fetchAllFoods = async () => {
    const { data } = await axiosSecure.get(`/requests/${user?.email}`, {
      withCredentials: true,
    });
    setFoodsRequest(data);
  };
  // console.log(foodsRequest);
  return (
    <section className="container px-4 mx-auto my-12">
      <div className="flex justify-center items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">
          All Food Requests
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {foodsRequest.length} Food Request
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-900"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Donar Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900"
                    >
                      <span>Pickup Location</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Expire Date</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900"
                    >
                      Request Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {foodsRequest.map((request) => (
                    <tr key={request._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {request.donatorName}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {request.pickupLocation}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {request.expireDeadline}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {request.requestDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFoodRequest;
