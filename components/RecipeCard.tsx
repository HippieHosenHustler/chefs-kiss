import Recipe from "../models/Recipe";
import Link from "next/link";

export default function RecipeCard({recipe}: {recipe: Recipe}) {
    const {title, slug, cookingTime} = recipe.fields;

    return (
        <div className={"card"}>
            <div className="featured">
                {/* TODO: Add thumbnail */}
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
