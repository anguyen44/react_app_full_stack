import Cookies from "js-cookie";

const TokenService = {
  getToken: () => Cookies.get("token"),
  setToken: (id_token) =>
    Cookies.set("token", id_token, {
      secure: true,
      sameSite: "strict",
    }),
};

export default TokenService;
