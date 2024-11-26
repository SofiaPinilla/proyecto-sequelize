const request = require("supertest");
const app = require("../index.js");
const { User } = require("../models/index.js");

describe("testing/users", () => {
    afterAll(() => {
        return User.destroy({ where: {}, truncate: true });
      });
    
  const user = {
    name: "Username",
    email: "test@example.com",
    password: "123456",
    role: "user",
  };

  test("Create a user", async () => {
    let usersCount = await User.count();
    expect(usersCount).toBe(0);

    const res = await request(app).post("/users/create").send(user).expect(201);
    usersCount = await User.count();
    expect(usersCount).toBe(1);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.createdAt).toBeDefined();
    expect(res.body.user.updatedAt).toBeDefined();

    const sendUser = {
      ...user,
      id: res.body.user.id,
      password: res.body.user.password,
      createdAt: res.body.user.createdAt,
      updatedAt: res.body.user.updatedAt,
    };
    const newUser = res.body.user;
    expect(newUser).toEqual(sendUser);
  });
  let token;
test("Login a user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "123456" })
      .expect(200);
    token = res.body.token;
  });
  test("Get users", async () => {
    const res = await request(app)
      .get("/users/getAll")
      .expect(200)
      .set({ Authorization: token });
      expect(res.body).toBeInstanceOf(Array);
  });
  test("Update a user record", async () => {
    const updateUser = { name: "Updated name" };
    const res = await request(app)
      .put("/users/id/1")
      .send(updateUser)
      .set({ Authorization: token })
      .expect(200);
      expect(res.body.message).toBe("User successfully updated");
  });
  test("Logout a user record", async () => {
    const res = await request(app)
      .delete("/users/logout")
      .set({ Authorization: token })
      .expect(200);
      expect(res.body.message).toBe("Desconectado con éxito");
  });

});

