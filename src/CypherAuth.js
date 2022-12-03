const Cypher = () => {
  return (
    <>
      <center>
        <h1>Cypher Auth</h1>
      </center>
      <ul>
        <li>
          <label>Shift</label>
          <br />
          <input type="number" name="shift" />
        </li>
        <li>
          <label>Plan Text</label>
          <br />
          <input type="text" name="plan text" />
        </li>
        <li>
          <label>Validate Cypher Text</label>
          <br />
          <input type="text" name="Cypher text" />
          <button>Validate</button>
        </li>
      </ul>
    </>
  );
};

export default Cypher;
