import { AllUsersContextObj } from "../../contexts/AllUsersContext";
import { useContext } from "react";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";

function Inactive() {
  const { allUsers, setAllUsers, error } = useContext(AllUsersContextObj);

  // Filter only inactive users (excluding admins)
  const inactiveUsers = allUsers.filter(
    (userObj) => userObj.isActive === false && userObj.role !== "admin"
  );

  // Function to unblock a user (set isActive to true)
  async function unblockUser(userObj) {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin-api/unblock/${userObj.email}`,
        { isActive: true }
      );

      if (response.data.success) {
        // Update state immediately after API response
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userObj.email ? { ...user, isActive: true } : user
          )
        );
      } else {
        console.error("Failed to unblock user");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  }

  return (
    <div className="container">
      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      {inactiveUsers.length === 0 ? (
        <p className="text-center mt-4 text-muted">No Inactive Users found.</p>
      ) : (
        <table className="table mt-4 table-striped text-center">
          <thead className="table-dark text-center">
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inactiveUsers.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="text-success d-flex justify-content-evenly w-50 mx-auto">
                  <p>Enable user</p>
                  <MdCheckCircle
                    size={32}
                    onClick={() => unblockUser(user)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    title="Unblock User"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inactive;