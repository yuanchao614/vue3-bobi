export interface CreateUser {
    userName: string,
    email: string,
    passWord: string,
    userType: string
    createdDate: Date,
    updatedDate: Date
}

export interface UpdateUser extends CreateUser {
    _id: string
}