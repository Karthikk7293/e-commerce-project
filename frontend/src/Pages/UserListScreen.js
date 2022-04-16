import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, updateUser } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false)

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  // console.log(users);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/signin");
    }
  }, [dispatch, navigate, successUpdate,userInfo,refresh]);

  const blockHandler = (user) => {
    if (window.confirm("Do you want to block this user?")) {
      dispatch(updateUser({ ...user, isBlocked: true }));
    }
  };
  const unblockHandler = (user) => {
    if (window.confirm("Unblock this user?")) {
      dispatch(updateUser({ ...user, isBlocked: false }));
    }
  };
  const ChangeStatus = async (id) => {
    try {

const config = {
  headers:{
    "Content-Type":"application/json"
  }
  
}
const {data} = await axios.put(`/api/users/update/${id}`,config)
// console.log(data.message);
setRefresh(!refresh)
if(data.success){

}

      
    } catch (error) {
      alert(error)
      
    }



  }

  return (
    <Container fluid className="mx-0 px-0" >
      <Row>
        
        <Col xs={12} md={10} className="mx-auto my-3">
          <h1>Users</h1>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm tableColor"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.number}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {/* <LinkContainer to={`/admin/users/${user._id}/edit`}> */}
                        <Button variant="light" className="btn-sm" onClick={((e)=>ChangeStatus(user._id))} >
                          <i className="fas fa-edit"></i>
                        </Button>
                      {/* </LinkContainer> */}
                      {user.isBlocked ? (
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => unblockHandler(user)}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => blockHandler(user)}
                        >
                          Block
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserListScreen;
