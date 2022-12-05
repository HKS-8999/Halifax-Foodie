const Welcome = () => {
  return (
    <>
      <center>
        <h1>Welcome</h1>
        <h3>{localStorage.getItem("email")}</h3>
      </center>
    </>
  );
};

export default Welcome;
