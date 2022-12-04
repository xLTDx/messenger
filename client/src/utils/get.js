import { users } from "../DB"

export const getUserNameById = (id) => {
    if(id != 0)
        return users.find(obj => obj.id === id).name
}