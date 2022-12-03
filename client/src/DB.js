export const users = [
    {
        id: 1,
        name: "Илья"
    },
    {
        id: 2,
        name: "Тимоха"
    },
    {
        id: 3,
        name: "Дима"
    },
]

export const dialogs = [
    {
        dialogId: 1,
        users: [1, 2],
        messages: [
            {
                sender: 1,
                text: "Привет"
            },
            {
                sender: 2,
                text: "Здарова"
            },
            {
                sender: 2,
                text: "Как дела?"
            }
        ]
    },
    {
        dialogId: 2,
        users: [1, 3]
    },
    {
        dialogId: 3,
        users: [2, 3]
    },
]
