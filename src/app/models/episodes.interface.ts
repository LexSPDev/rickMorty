export interface Episode{
    id: number,
    name: string;
    image: string;
    gender: string;
    created: string;
    status: string;
}

export interface RequestInfo {
    next:string;
}