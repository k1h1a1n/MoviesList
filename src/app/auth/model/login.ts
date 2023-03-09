export interface LoginInput{
    username: string;
    password: string;
}

export interface LoginOutput{
    is_success: boolean;
    data: object;
    error: object;
}