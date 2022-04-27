import {createClient} from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID ? process.env.CONTENTFUL_SPACE_ID : "",
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? process.env.CONTENTFUL_ACCESS_TOKEN : ""
    });

    const entries = await client.getEntries({
        content_type: "recipe"
    });

    return {
        props: {
            recipes: entries.items
        }
    }
}

export default function Recipes({recipes}: { recipes: Array<any> }) {
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.sys.id} recipe={recipe}/>
            ))}
        </div>
    )
};
