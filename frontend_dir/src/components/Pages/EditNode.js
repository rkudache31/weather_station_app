import Form from "react-bootstrap/Form";
const EditNode = (props) => {
  const { reference, closeref, enodes, onchange, handleEdit } = props;

  console.log();
  return (
    <Form>
      <button
        type="button"
        ref={reference}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Uid *"
          name="uid"
          value={enodes.uid}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="location *"
          name="location"
          value={enodes.location}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Sub Location *"
          name="sublocation"
          value={enodes.sublocation}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="temperature"
          name="temperature"
          value={enodes.temperature}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="humidity *"
          name="humidity"
          value={enodes.humidity}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="windSpeed*"
          name="windSpeed"
          value={enodes.windSpeed}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="barometric"
          name="barometric"
          value={enodes.barometric}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="globalRadiation"
          name="globalRadiation"
          value={enodes.globalRadiation}
          onChange={onchange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="rain"
          name="rain"
          value={enodes.rain}
          onChange={onchange}
          required
        />
      </Form.Group>
      <button
        ref={closeref}
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button onClick={handleEdit} type="button" className="btn btn-primary">
        Save changes
      </button>
    </Form>
  );
};
export default EditNode;
