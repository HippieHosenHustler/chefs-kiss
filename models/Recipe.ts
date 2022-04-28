import {Asset} from "contentful";

export default interface Recipe {

    title: string;
    slug: string;
    cookingTime: number;
    thumbnail: Asset;

}


