import dayjs from "dayjs"

export const timeConverter=(time)=>{
    const todayDate = `${dayjs().format('YYYY-MM-DD')} ${time}`
    return dayjs(todayDate, 'YYYY-MM-DD HH:mm').format('hh:mm A')
}