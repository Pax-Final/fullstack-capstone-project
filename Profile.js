import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

function Profile() {
  const { setUserName } = useAppContext();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [editMode, setEditMode] = useState(true);
  const [changed, setChanged] = useState("");

  const handleSubmit = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const updatedDetails = { name: userDetails.name };

      const response = await fetch(`/api/auth/update`, {
        // Task 1: set method
        method: "PUT",

        // Task 2: set headers
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },

        // Task 3: set body to send user details
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        // Task 4: set the new name in the AppContext
        setUserName(updatedDetails.name);

        // Task 5: set user name in the session
        sessionStorage.setItem("name", updatedDetails.name);

        setUserDetails(updatedDetails);
        setEditMode(false);

        // Display success message to the user
        setChanged("Name Changed Successfully!");
        setTimeout(() => {
          setChanged("");
          navigate("/");
        }, 1000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (e) {
      console.log("Error updating details: " + e.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        type="text"
        value={userDetails.name}
        onChange={(e) => setUserDetails({ name: e.target.value })}
      />
      <button onClick={handleSubmit}>Update Profile</button>
      {changed && <div className="text-success">{changed}</div>}
    </div>
  );
}

export default Profile;
