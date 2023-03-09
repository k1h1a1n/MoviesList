export interface MovieListOutput {
    count:number;
    page:number;
    next:string;
    entries:number;
    results:Results[];
}

export interface Results {
    title:string;
    description:string;
    genres:string;
    uuid:string;
}