
export type LinkObject = {
    platform: string,
    link: string,
}
export type Profile = {
    firstname: string,
    lastname: string,
    email: string,
    photo?: string
}

export type SignupData = {
    email: string,
    password: string,
    passwordC?: string //password confirmation
}