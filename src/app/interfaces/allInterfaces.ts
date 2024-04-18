export interface personCompRelation{
    id: number;
    companyId: number;
    personId: number;
    relationship: string;
}

export interface Company{
    id:number;
    companyName:string;
    wikiLink:string;
    personRelationships:personCompRelation[];
    parentCompanyRelationships: CompanyOwners[];
    childCompanyRelationships: CompanyOwners[];
}

export interface CompanyOwners{
    id:number;
    childCompanyId:number;
    parentCompanyId:number;
}

export interface Person{
    id:number;
    personName:string;
    wikiLink:string;
    companyRelationships:personCompRelation[];
}

export interface Website{
    id:number;
    companyId:number;
    personId:number;
    url: string;
}

export interface partialRelationship{
    id:number;
    partialOwnerId:number;
    relationship:string;
    ownedCompanyId:number;
}