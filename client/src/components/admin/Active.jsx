import { AllUsersContextObj } from "../../contexts/AllUsersContext";
import { useContext } from "react";
import { MdBlock } from "react-icons/md";
import axios from "axios";

function Active() {
  const { allUsers, setAllUsers, error } = useContext(AllUsersContextObj);

  // Filter only active users
  const activeUsers = allUsers.filter(
    (userObj) => userObj.isActive === true && userObj.role !== "admin"
  );

  // Function to block a user (set isActive to false and update state)
  async function blockUser(userObj) {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin-api/block/${userObj.email}`,
        { isActive: false }
      );

      if (response.data.success) {
        // Update state with a new array (React requires immutable updates)
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userObj.email ? { ...user, isActive: false } : user
          )
        );
      } else {
        console.error("Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  }

  return (
    <div className="container">
      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      {activeUsers.length === 0 ? (
        <p className="text-center mt-4 text-muted">No Users found.</p>
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
            {activeUsers.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="text-danger d-flex justify-content-evenly w-50 mx-auto">
                  <p>Disable user</p>
                  <MdBlock
                    size={32}
                    onClick={() => blockUser(user)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    title="Block User"
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

export default Active;