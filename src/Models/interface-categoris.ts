export interface Categoris{
    title:string,
    description?:string,
    icon?:string,
    expandible:boolean,
    click:boolean,
    subCategoris?:Categoris[]
}