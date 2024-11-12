export interface UseCaseResponse {
    Data: any;
    Exception: {
        status: number;
        messageError: string;
    } | null;
};
