const Login = () => {
  return (
    <>
      <center>
        <h1>Login</h1>
      </center>
      <ul>
        <li>
          <a href="https://resto-client-auth.auth.ap-south-1.amazoncognito.com/login?client_id=7re2h5j15gu3tfql6oe4gnftco&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:3000/auth-questions">
            Customer
          </a>
        </li>
        <li>
          <a href="  https://resto-owner-app.auth.ap-south-1.amazoncognito.com/login?client_id=4ppsva9chdc6i0f2hr6641ji90&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:3000/auth-questions">
            Restaurant
          </a>
        </li>
      </ul>
    </>
  );
};

export default Login;
