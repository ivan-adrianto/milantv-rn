export const dateFormatter = (string) => {
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(string)
    const month = date.getMonth() 
    const day = date.getDate()
    const year = date.getFullYear()
    return `${months[month]} ${day}, ${year}`
}