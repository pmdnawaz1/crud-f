import React, { useEffect, useState } from "react";
import axios from "axios";

function Channels() {
  const [channels, setChannels] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    // Fetch user's permissions from the backend API
    axios.get("/api/user/permissions").then((response) => {
      setUserPermissions(response.data.permissions);
    });

    // Fetch list of all channels from the backend API
    axios.get("/api/users/get-channels").then((response) => {
      const availableChannels = response.data.filter((channel) =>
        userPermissions.some(
          (permission) =>
            permission.channelName === channel.name &&
            permission.readPermission === true
        )
      );
      setChannels(availableChannels);
    });
  }, [userPermissions]);

  const handleDelete = (channelId) => {
    // Delete channel with given ID from the backend API
    axios.delete(`/api/channels/${channelId}`).then((response) => {
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel._id !== channelId)
      );
    });
  };

  const handleEdit = (channelId) => {
    // Navigate to edit channel page with given ID
    // Example implementation using React Router
    history.push(`/channels/${channelId}/edit`);
  };

  return (
    <div>
      <h1>Channels</h1>
      {channels.length > 0 ? (
        <ul>
          {channels.map((channel) => (
            <li key={channel._id}>
              {channel.name}
              {userPermissions.some(
                (permission) =>
                  permission.channelName === channel.name &&
                  permission.editPermission === true
              ) && (
                <button onClick={() => handleEdit(channel._id)}>Edit</button>
              )}
              {userPermissions.some(
                (permission) =>
                  permission.channelName === channel.name &&
                  permission.deletePermission === true
              ) && (
                <button onClick={() => handleDelete(channel._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No channels available</p>
      )}
    </div>
  );
}

export default Channels;
