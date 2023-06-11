module.exports = {
    components: {
        schemas: {
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
            comment: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "task identification number",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    title: {
                        type: 'string',
                        description: "task's title",
                        example: "make an excellent readme"
                    },
                    completed: {
                        type: "boolean",
                        description: "The status of the task",
                        example: false
                    }
                }
        },
        }
    }
}

