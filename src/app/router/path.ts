export const PATH = {
  home: "/",
  login: "/login",
  signup: "/signup",
  users: "/users",
  userDetail: (id: string | number) => `/users/${id}`,
} as const;
