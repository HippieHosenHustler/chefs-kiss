import {createClient, EntryCollection} from "contentful";
import Recipe from "../../models/Recipe";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ? process.env.CONTENTFUL_SPACE_ID : '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? process.env.CONTENTFUL_ACCESS_TOKEN : ''
});

export const getStaticPaths = async () => {
    const entries: EntryCollection<Recipe> = await client.getEntries({
        content_type: 'recipe'
    });
    const paths = entries.items.map(entry => ({
        params: {
            slug: entry.fields.slug
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async ({params}: {params: {slug: string}}) => {
    const entries: EntryCollection<Recipe> = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    });
    const recipe = entries.items[0];
    return {
        props: {
            recipe
        }
    };
};

export default function RecipeDetails() {

    return (
        <div>
            Recipe Details
        </div>
    )
};
