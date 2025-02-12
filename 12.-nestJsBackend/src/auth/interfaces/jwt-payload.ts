
export interface JwtPayload {
    id: string;
    iat?: number; //fecha de creación
    expt?: number; //fecha de expiración
}