module.exports = {
    components: {
        schemas: {
            chat: {
                type: 'object',
                properties: {
                    users: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    history: {
                        type: 'array',
                        description: "Array of User messages",
                        items: {
                            type: 'string',
                            format: 'string'
                        },
                        example: ["Message1", "Message2", "Message3"]
                    }
                }
            },
            comment: {
                type: 'object',
                properties: {
                    userId: {
                        type: 'objectId',
                        description: "ID of the USER logged and allowed to comment ",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    body: {
                        type: 'string',
                        description: "Content of the comment",
                        example: "El evento de Google fué realmente inspirador y superó mis expectativas"
                    },
                    noticeId: {
                        type: 'objectId',
                        description: "ID of the NOTICE which user wants to comment",
                        example: "648349af53f64d7139943751"
                    },
                    likesUserC: {
                        type: 'array',
                        description: "Array of User Id's",
                        items: {
                            type: 'string',
                            format: 'objectId'
                        },
                        example: ["647b5bd25aeb4ab6eebf0723", "647b5bf55aeb4ab6eebf0725", "647b5bd25aeb4ab6eebf0723"]
                    }
                }
            },
            degree: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        required: true ,
                        description: "Name of studies DEGREE of the User",
                        example: "Bootcamp"
                    },
                }
            },
            hobby: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: "Name of the HOBBY used to classify Agora Users",
                        example: "Cine"
                    },
                }
            },
            skill: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: "Name of the SKILL used to classify Agora Users",
                        example: "Programación"
                    },
                }
            },
            tag: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: "Name of the TAG used to label the Events",
                        example: "Inteligencia Artificial"
                    },
                }
            },
        }
    }
}

