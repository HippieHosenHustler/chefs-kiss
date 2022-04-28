import Recipe from "../models/Recipe";
import Link from "next/link";
import Image from "next/image";
import {Entry} from "contentful";

export default function RecipeCard({recipe}: {recipe: Entry<Recipe>}) {
    const {title, slug, cookingTime, thumbnail} = recipe.fields;

    const width = thumbnail.fields.file.details.image?.width ? thumbnail.fields.file.details.image.width : 300;
    const height = thumbnail.fields.file.details.image?.height ? thumbnail.fields.file.details.image.height : 300;

    return (
        <div className={"card"}>
            <div className="featured">
                <Image
                    src={'https:' + thumbnail.fields.file.url}
                    alt={title}
                    width={width}
                    height={height}/>
            </div>

            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>Takes approx {cookingTime} minutes to make</p>
                </div>
                <div className="actions">
                    <Link href={'/recipes/' + slug}><a>Cook this</a></Link>
                </div>
            </div>
        </div>
    )
};
