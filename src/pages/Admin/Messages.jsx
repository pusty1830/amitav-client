import React, { useEffect, useState } from "react";
import { getContactMessages, deleteContactMessage } from "../../services/Service";

const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getContactMessages(payLoad)
      .then((res) => {
        setMessages(res?.data?.data?.rows || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteContactMessage(id) // 👈 call delete API
        .then(() => {
          setMessages((prev) => prev.filter((msg) => msg.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Messages</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <tr key={msg.id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.yourSubject}</td>
                <td>{msg.message}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No messages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;
