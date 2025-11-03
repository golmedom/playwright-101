export function getCredentials(type) {
  const mocks = {
    valid: {
      username: process.env.VALID_USERNAME,
      password: process.env.VALID_PASSWORD,
      message: "User successfully logged in!",
    },
    blocked: {
      username: process.env.BLOCKED_USERNAME,
      password: process.env.BLOCKED_PASSWORD,
      message: "User blocked!",
    },
    notFound: {
      username: process.env.NOT_FOUND_USERNAME,
      password: process.env.NOT_FOUND_PASSWORD,
      message: "User not found!",
    },
    wrongPassword: {
      username: process.env.WRONG_PASSWORD_USERNAME,
      password: process.env.WRONG_PASSWORD_PASSWORD,
      message: "Incorrect username or password!",
    },
    tempBlocked: {
      username: process.env.TEMP_BLOCK_USERNAME,
      password: process.env.TEMP_BLOCK_PASSWORD,
      message: "User temporarily blocked!",
    },
  };

  return mocks[type];
}
