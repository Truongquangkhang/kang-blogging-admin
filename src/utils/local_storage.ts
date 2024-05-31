
export const GetFromLocalStorageByKey = (key: string) => {
    const value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    } else {
        return null
    }
}

export const SetValueToLocalStorageWithKey = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const RemoveItemByKey = (key: string) => {
    localStorage.removeItem(key)
}