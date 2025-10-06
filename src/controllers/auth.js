import { loginUser, logoutUser, refreshSession, registerUser } from "../services/auth.js";

export async function registerUserController(req, res) {
  const user = await registerUser(req.body);
  res.status(201).json({ status: 201, message: 'Successfully registered a user!', data: user });
}

export async function loginUserController(req, res) {
  console.log(req);
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken
    }
  });
}

export async function refreshSessionController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken
    }
  });

}


export async function logoutUserController(req, res) {
  const { sessionId } = req.cookies;

  if (typeof sessionId === "string") {
    await logoutUser();
  }
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).json({ status: 204 });
}