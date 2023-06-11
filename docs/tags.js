module.exports = {
    paths: {
        "/tags/create": {
            post: {
                tags: {
                    Tasks: "Get Tasks",
                },
                description: "Get tasks",
                operationId: "getTasks",
                parameters: [],
                responses: {
                    200: {
                        description: "Tasks were obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/task",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};