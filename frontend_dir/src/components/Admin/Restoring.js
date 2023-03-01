import NoteContext from "../../context/nodesContext";
import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
const Restoring = (props) => {
  const context = useContext(NoteContext);
  const { node } = props;

  const { editNodesUser, deleteNodes } = context;
  const [userIds, setUserId] = useState("");
  const [userNames, setUserName] = useState("");

  const handleDelete = (id) => {
    deleteNodes(id);
  };
  const handleEdit = (e) => {
    // editNodesUser(userId, userNames);
  };

  return (
      <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <Card>
          <h3>{node.uid}</h3>
          <p>{node.user}</p>
          <Button onClick={() => handleEdit()}>Restore</Button>
          <Button onClick={() => handleDelete(node._id)}>Delete</Button>
        </Card>
      </div>
  );
};
export default Restoring;
