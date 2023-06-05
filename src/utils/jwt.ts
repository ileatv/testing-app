//Date component
import { getUnixTime } from "./date"

//Интерфейс для того, чтобы знать, что нам вернется
export interface IAuthTokenInfo {
    exp: number
    iat: number
    login: string
}

//Максимальное время для обновления (когда осталось 5 секунд, токены обновляются)
const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) {
        return true
    }

    try {
        const tokenInfo = token.split('.')[1]

        //С помощью функции atob расшифровываем токен
        const tokenInfoDecoded = window.atob(tokenInfo)

        //exp и iat - две переменные для того, чтобы узнать, когда токен выпустился, и когда он истек
        const { exp, iat }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded)

        //Вычисляем оставшееся время токена, с помощью функции из файла date.ts
        const tokenLeftTime = exp - getUnixTime()

        //Минимальное время для обновления
        const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER

        //Если осталось меньше минимального времени для обновления токена то возвращаем false
        return tokenLeftTime < minLifeTimeForUpdate
    } catch (e) {
        console.error(e)
        return true
    }
}