module.exports = {
    paths: {
        "/tags/create": {
            post: {
                tags: {
                    Tasks: "Create Tag",
                },
                description: "Endpoint to create a TAG",
                operationId: "createTag",
                parameters: [],
                responses: {
                    200: {
                        description: "TAG was successfully created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/tag",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};