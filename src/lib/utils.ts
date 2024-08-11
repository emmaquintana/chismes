import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomString(len: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export async function wait(ms: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

export const dateObj = (props: Date) => {
  return {
    day: props.getDate(),
    month: props.getMonth()! + 1,
    year: props.getFullYear(),
    hour: props.getHours(),
    minute: props.getMinutes()! < 10 ? "0" + props.getMinutes() : props.getMinutes(),
    second: props.getSeconds()
  }
}

/**Cmon man, common date is in format DD/MM/YY HH:MM */
export const getCommonDate = (date:Date) => {
  return `${dateObj(date).day}-${dateObj(date).month}-${dateObj(date).year} ${dateObj(date).hour}:${dateObj(date).minute}`
}