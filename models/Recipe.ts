import {Asset} from "contentful";
import {Document} from "@contentful/rich-text-types";

export default interface Recipe {

    title: string;
    slug: string;
    cookingTime: number;
    thumbnail: Asset;
    featuredImage: Asset;
    ingredients: string[];
    method: Document;

}


