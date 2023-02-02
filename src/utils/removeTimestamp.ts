import dayjs from "dayjs"

export function removeTimestamp(date?: string | number | dayjs.Dayjs | Date | null | undefined) {
    return dayjs(date).startOf('day').toDate()
}