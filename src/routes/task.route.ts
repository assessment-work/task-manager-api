import { Router } from "express";

function taskRouter() {
  const router = Router();

  router.get("/", (_, res) => {
    res.json({
      data: [
        {
          id: 1,
          title: "Task 1",
          description: "This is task 1",
          isCompleted: false,
        },
      ],
    });
  });

  return router;
}

export { taskRouter };
