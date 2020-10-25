export interface ICrypto {
    md5(pass: string, option?: any): string;
}

export interface IToken {
    decodeToken: any;
    generateToken(param: string): string;
    verifyToken(bearerToken: string): any;
}
