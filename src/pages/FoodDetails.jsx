// import React, { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
// import axios from "axios";

// const FoodDetails = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [startDate, setStartDate] = useState(new Date());
//   const { id } = useParams();
//   const [food, setFood] = useState({});

//   useEffect(() => {
//     fetchFoodData();
//   }, [id]);
//   const fetchFoodData = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_URL}/food/${id}`
//     );
//     setFood(data);
//     // setStartDate(new Date(data.deadline));
//   };
//   const {
//     foodName,
//     foodImage,
//     foodQuantity,
//     pickupLocation,
//     deadline,
//     additionalNotes,
//     donatorName,
//     email,
//     foodStatus,
//   } = food || {};
//   return (
//     <div>
//       <h2>{foodName}</h2>
//     </div>
//   );
// };

// export default FoodDetails;
import React from "react";

const FoodDetails = () => {
  return (
    <div>
      <h2>Food Details</h2>
    </div>
  );
};

export default FoodDetails;
