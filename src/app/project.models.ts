export interface projeto{
    key?:string|null;    
    nome?: string;
    descricao?:string;
    responsavel?:string;
    integrantes?:string[];
    dataTermino?:number | Date;
    prazo?:number;
    dataCriacao?:number | Date;
}

export interface sprint{
    key?:string|null;    
    projectKey?:string|null;    
    nome?:string,
    dataCriacao?:number | Date;
    dataTermino?:number | Date,
    prazo?:number,
}
