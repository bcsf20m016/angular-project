

export class Book{
    id: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;

    constructor(id:number=0, title:string='', author:string='', description:string='', imageUrl:string=''){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}