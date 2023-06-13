module.exports = {
    paths: {
        "/users/register": {
            post: {
                tags: {
                    Usuario: "Crear un usuario",
                },
                description: "Crear un nuevo usuario",
                operationId: "crearUsuario",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/user",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Usuario creado correctamente",
                    },
                    500: {
                        description: "Error del servidor",
                    },
                },
            },
        },
        "/users/login": {
            post: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: {
                    Usuario: "Loguearse",
                },
                description: "Login de ususario",
                operationId: "loginUsuario",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/userLogin",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Usuario logueado con éxito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/userLogin",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/logout": {
            delete: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: {
                    Usuario: "Des loguearse",
                },
                description: "Log out de ususario",
                operationId: "logoutUsuario",
                parameters: [],
                responses: {
                    200: {
                        description: "Usuario desconectado con éxito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/userLogin",
                                },
                            },
                        },
                    },
                },
            },
        },
    },

};