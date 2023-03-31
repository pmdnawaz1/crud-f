const addChannel = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is required");
      }
      const decodedToken = jwt.decode(token);
      if (decodedToken.role !== "admin") {
        throw new Error("You are not authorized to perform this action");
      }
      if (!channelName) {
        throw new Error("Channel name is required");
      }
      const response = await axios.post(
        "/api/admin/add-channel",
        {
          name: channelName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setChannelName("");
      setSuccessMessage("Channel added successfully");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={addChannel}>Add Channel</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
  