import { Hono } from "hono";
import { cors } from "hono/cors";
import { v4 as uuidv4 } from "uuid";
import { swaggerUI } from "@hono/swagger-ui";

import {
  StructError,
  assert,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
import {
  authenticateUser,
  helloMiddleware,
  setContextVariable,
  authMiddleware,
} from "./middleware";
import { CustomError } from "./errors";
import { swaggerSpec } from "./swagger-spec";

// Schemas
const todoSchema = object({
  title: string(),
  completed: optional(boolean()),
});

// Context
type Context = {
  Bindings: {
    TODOS: KVNamespace;
  };
  Variables: {
    customContextVar: string;
    user_id: string;
  };
};

// Application and CORS
const app = new Hono<Context>();
app.use("*", cors({ origin: "*", maxAge: 3600 * 6, credentials: true }));

app.use("/api/*", authMiddleware);

app.onError((error, c) => {
  console.log(error.message);

  const status =
    error instanceof CustomError
      ? error.status
      : error instanceof StructError
      ? 400
      : 500;

  return c.json({ error: error.message, status: status }, status);
});

// Get Requests
app.get("/", helloMiddleware, setContextVariable, (c) => {
  const cVar = c.get("customContextVar");
  return c.text(cVar);
});

app.get("/error", (c) => {
  const data = {
    title: "test",
    completed: "false",
  };
  assert(data, todoSchema);
  return c.json("Custom Context Value:" + data);
});

// get todos by user_id from authentication header
app.get("/todos", authenticateUser, async (c) => {
  const user_id = c.get("user_id");
  const items = await c.env.TODOS.list({ prefix: `${user_id}_` });
  const todos = await Promise.all(
    items.keys.map(({ name }) => c.env.TODOS.get(name))
  );
  return c.json(todos);
});

// Get all todos
app.get("/api/todos", async (c) => {
  console.log("JWT PAYLOAD");
  console.log(c.get("jwtPayload"));

  const items = await c.env.TODOS.list();
  const todos = await Promise.all(
    items.keys.map(({ name }) => c.env.TODOS.get(name))
  );
  return c.json(todos);
});

// Post new Todo
app.post("/api/todos", /* authenticateUser,*/ async (c) => {
  const user_id = c.get("user_id");
  const data = await c.req.json();

  assert(data, todoSchema);

  const id = uuidv4();

  const todo = {
    id,
    title: data.title,
    completed: data.completed,
  };

  await c.env.TODOS.put(`${user_id}_${id}`, JSON.stringify(todo));
  return c.json(todo);
});

export default app;
