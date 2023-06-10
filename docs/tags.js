module.exports = {
    paths: {
        "/tasks": {
            post: {
                tags: {
                    Tasks: "Create a task",
                },
                description: "Create Task",
                operationId: "createTask",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/TaskInput",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Task created successfully",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
    },
}

