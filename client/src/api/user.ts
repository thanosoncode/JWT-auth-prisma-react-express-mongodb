export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:5555/api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data: { message: string; email?: string; status: number } =
      await response.json();
    data.status = response.status;
    return data;
  } catch (error) {
    throw new Error("Something went terribly wrong");
  }
};

export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:5555/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data: {
      message: string;
      email?: string;
      status: number;
      token: string;
    } = await response.json();
    data.status = response.status;
    document.cookie = "token=" + data.token;
    return data;
  } catch (error) {
    throw new Error("Something went terribly wrong");
  }
};

export const getUsers = async (): Promise<
  { id: string; email: string }[] | undefined
> => {
  try {
    const cookie = document.cookie.split("token=")[1];
    const response = await fetch("http://localhost:5555/api/user/getUsers", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Cookie: cookie,
        Authorization: `Bearer ${cookie}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
