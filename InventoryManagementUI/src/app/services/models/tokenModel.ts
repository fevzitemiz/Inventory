export interface TokenModel {
    iat: number,
    isAdmin: boolean,
    surName: string,
    name: string,
    time: Date | null,
    userId: number
}