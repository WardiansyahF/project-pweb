import Table from "./components/Table";
import Form from "./components/Form";
import Button from "./components/common/Button";
import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // melakukan fetching data
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error mendapatkan user: " + error);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    // todo: act add data
    event.preventDefault();
    if (name && username && email) {
      const newData = {
        name,
        username,
        email,
      };
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        setUsers([...users, data]);
        setUsername("");
        setName("");
        setEmail("");
      } catch (error) {
        console.error(`Error menambahkan user ${error}`);
      }
    }
  };

  const handleEdit = (id) => {
    const updateUser = users.find((data) => data.id === id);
    if (updateUser) {
      setName(updateUser.name);
      setUsername(updateUser.username);
      setEmail(updateUser.email);
      setUserId(updateUser.id);
    }
  };

  // todo: your code for LA (Update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (userId) {
      const dataToUpdate = {
        name,
        username,
        email,
      };
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            method: "PATCH",
            body: JSON.stringify(dataToUpdate),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await res.json();
        const dataAfterUpdate = users.map((user) =>
          user.id === userId ? data : user
        );
        setUsers(dataAfterUpdate);
        setName("");
        setUsername("");
        setEmail("");
        setUserId(null);
      } catch (error) {
        console.error(`Error updating user ${error}`);
      }
    }
  };

  // todo act delete
  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      const deletedData = users.filter((user) => user.id !== id);
      setUsers(deletedData);
    } catch (error) {
      console.error(`Error delete user ${error}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-royal-blue-300 to-royal-blue-600 gap-y-5">
        <h1 className="text-2xl font-bold mb-4">APLIKASI DATA PEGAWAI</h1>
        <Form onSubmit={handleSubmit}>
          <Form.FieldSet>
            <Form.Input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Name"
            ></Form.Input>
            <Form.Input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            ></Form.Input>
            <Form.Input
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            ></Form.Input>
          </Form.FieldSet>
          <Button
            type="submit"
            className="flex justify-center outline text-white bg-teal-400"
            text={
              <>
                <IconPlus />
                Add Data
              </>
            }
          ></Button>
        </Form>
        <Button
          type="submit"
          className="flex justify-center bg-teal-500 shadow-lg hover:bg-teal-700 active:bg-teal-600"
          text={<>Update Data</>}
          onClick={handleUpdate}
        />

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Username</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head></Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((data, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Data>{data.name}</Table.Data>
                  <Table.Data>{data.username}</Table.Data>
                  <Table.Data>{data.email}</Table.Data>
                  <Table.Data>
                    <div className="flex items-center justify-center gap-x-4">
                      <Table.Button onClick={() => handleEdit(data.id)}>
                        Edit
                      </Table.Button>
                      <Table.Button
                        className="flex justify-center bg-rose-500 hover:bg-rose-700 active:bg-rose-600"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Table.Button>
                    </div>
                  </Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default App;
