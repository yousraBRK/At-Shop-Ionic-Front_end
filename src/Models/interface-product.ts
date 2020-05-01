export interface Product {
    title :string;
    categoris:string;
    subCategoris:string;
    details:string;
    pictures:string[];
    price:number;
    id:string;
    availability:Availability;
    createdAt:Date;
    avrageStars:number;

}
export interface Availability{
    available:boolean;
    type:string;
    freed ?:number;
}