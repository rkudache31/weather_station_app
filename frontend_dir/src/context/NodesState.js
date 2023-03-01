import { useState } from "react";
import NoteContext from "./nodesContext";
import { getTokenFromLocalStorage } from "./../components/lib/common";
const NodesState = (props) => {
  const notesInitial = [];
  const nodesGetdate = [];
  const userDataArray = [];
  const userNodesValues = [];
  const setTempDeleteArray = [];
  const [nodes, setNodes] = useState(notesInitial);
  const [userNodesValue, setUserNodesvalues] = useState(userNodesValues);
  const [nodeDate, setNodesDate] = useState(nodesGetdate);
  const [userData, setUser] = useState(userDataArray);
  const [tempDelete, setTempDelete] = useState(setTempDeleteArray);
  // const [userId, setUserId] = useState("");
  // const [userUid, setUserUid] = useState("");
  // const [userName, setUserName] = useState("");

  const getUser = async () => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    // console.log(json.data.users);
    setUser(json.data.users);
  };
  const getNodes = async () => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/nodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setNodes(json);
  };

  const getNodesUser = async (id) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/nodes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    // console.log(json);
    setUserNodesvalues(json);
  };
  const getNodesRestore = async () => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://20.207.204.225:3001/api/v1/nodes/tempdelete`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    // setUserId(json[0]._id);
    // setUserUid(json[0].uid);
    // setUserName(json[0].name);
    setNodes(json);
    console.log(json.uid);
  };
  const addNodes = async (
    uid,
    user,
    location,
    sublocation,
    templow,
    temphigh,
    humilow,
    humihigh,
    windlow,
    windhigh,
    baromelow,
    baromehigh,
    globallow,
    globalhigh,
    rainlow,
    rainhigh
  ) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/nodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid,
        user,
        location,
        sublocation,
        templow,
        temphigh,
        humilow,
        humihigh,
        windlow,
        windhigh,
        baromelow,
        baromehigh,
        globallow,
        globalhigh,
        rainlow,
        rainhigh,
      }),
    });
    const addnodes = await response.json();
    setNodes(nodes.concat(addnodes));
  };
  const GetUidAndDate = async (uid, startDate, endDate) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://20.207.204.225:3001/api/v1/nodes/getDataByDate/?uid=${uid}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    setNodesDate(json);
  };

  const deleteNodes = async (id) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/nodes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const newnotes = nodes.filter((node) => {
      return id !== node.uid;
    });
    console.log(newnotes);
    setNodes(newnotes);
  };
  const editNodes = async (
    id,
    uid,
    location,
    sublocation,
    templow,
    temphigh,
    humilow,
    humihigh,
    windlow,
    windhigh,
    baromelow,
    baromehigh,
    globallow,
    globalhigh,
    rainlow,
    rainhigh
  ) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`http://20.207.204.225:3001/api/v1/nodes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid,
        location,
        sublocation,
        templow,
        temphigh,
        humilow,
        humihigh,
        windlow,
        windhigh,
        baromelow,
        baromehigh,
        globallow,
        globalhigh,
        rainlow,
        rainhigh,
      }),
    });
    const json = await response.json();
    console.log(json);
    let newNode = JSON.parse(JSON.stringify(nodes));
    setNodes(newNode);
  };
  const deleteTempNode = async (uid, user) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://20.207.204.225:3001/api/v1/nodes/tempdelete/${uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user,
        }),
      }
    );
    const json = await response.json();
    setTempDelete(json);
  };
  const editNodesUser = async (uid, user) => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://20.207.204.225:3001/api/v1/nodes/${uid}/restore`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    let newNode = JSON.parse(JSON.stringify(nodes));
    setUser(newNode);
  };

  return (
    <NoteContext.Provider
      value={{
        userData,
        nodes,
        nodeDate,
        tempDelete,
        userNodesValue,
        getUser,
        getNodes,
        getNodesRestore,
        getNodesUser,
        addNodes,
        deleteNodes,
        deleteTempNode,
        editNodes,
        editNodesUser,
        GetUidAndDate,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NodesState;
