
export type LinkObject = {
    platform: string,
    link: string,
    user_id?: number,
    link_id?: number,
}
export type Profile = {
    firstname: string,
    lastname: string,
    email: string,
    photo?: string,
    user_id?: number,
}

export type SignupData = {
    email: string,
    password: string,
    passwordC?: string //password confirmation
}