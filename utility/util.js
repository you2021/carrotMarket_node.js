class Util {

    static getDate(){
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const sec = now.getSeconds();

        const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${sec}`
        return dateTime
    }
}