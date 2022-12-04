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

export interface backlog{
    key?:string|null;    
    titulo?:string,
    descricao?:string,
    responsavel?:string,
    integrantes?:string,
    sprintKey?:string,
    backlogKey?:string,
    dificuldade?:string,
    dataTermino?:number | Date,
    dataCriacao?:number | Date,
    prazo?:number,
    status?:string,
    artefatos?:artefato[]
}

export interface artefato{
    key?:string|null;    
    titulo?:string,
    descricao?:string,
    responsavel?:string,
    integrantes?:string,
    sprintKey?:string,
    dificuldade?:string,
    dataTermino?:number | Date,
    dataCriacao?:number | Date,
    prazo?:number,
    status?:string
}