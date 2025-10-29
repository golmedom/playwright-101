export function getCredentials(type) {
  const mocks = {
    valid: {
      username: "test",
      password: "password123",
      message: "User successfully logged in!",
    },
    blocked: {
      username: "testblock",
      password: "password123",
      message: "User blocked!",
    },
    notFound: {
      username: "test-not-found",
      password: "password123-not-found",
      message: "User not found!",
    },
    wrongPassword: {
      username: "test",
      password: "password1234",
      message: "Incorrect username or password!",
    },
    tempBlocked: {
      username: "test",
      password: "password1234",
      message: "User temporarily blocked!",
    },
  };

  return mocks[type];
}
