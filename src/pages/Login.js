import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import GoogleLogin from "react-google-login";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "3em"
  },
  googleButtonContainer: {
    width: 200,
    margin: "1em auto 0 auto"
  },
  googleButton: {
    padding: "1em 1.5em"
  }
}));

const Login = ({ isAuthenticated, getTokenFromLogin }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const onSuccesLogin = response => {
    getTokenFromLogin(response.accessToken);
  };

  const onFailureLogin = () => {
    setError(true);
  };

  return (
    <div className={classes.container}>
      {isAuthenticated ? <Redirect to="/" /> : null}
      <Typography align="center" variant="h5">
        {error ? "Error logging in. Try again." : "Login to see your calendar."}
      </Typography>
      <div className={classes.googleButtonContainer}>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          scope="https://www.googleapis.com/auth/calendar"
          render={renderProps => (
            <Button
              className={classes.googleButton}
              variant="contained"
              color="primary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login with Google
            </Button>
          )}
          onSuccess={onSuccesLogin}
          onFailure={onFailureLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getTokenFromLogin: PropTypes.func.isRequired
};

export default Login;
