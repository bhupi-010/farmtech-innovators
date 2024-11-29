import dayjs from "dayjs"

export const formatDate = (date?: string | Date | null) => {
    
    return date ? dayjs(new Date(date)).format('YYYY-MM-DD') : '-'
}

export const formatDateYYYYMMDD = (date?: string | Date | null): string => {
  return date ? dayjs(new Date(date)).format('YYYYMMDD') : '-';
};

export const formatDateWithTime = (date: string | Date) => {
    return date ? dayjs(new Date(date)).format('YYYY-MM-DD hh:mm A') : '-'
}

export const getNow = () => {
    return dayjs(new Date()).format('YYYY-MM-DD hh:mm A')
}

export const isDateSame = (d1:Date, d2:Date):boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }