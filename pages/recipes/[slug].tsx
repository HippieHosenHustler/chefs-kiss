import {createClient, Entry, EntryCollection} from "contentful";
import Recipe from "../../models/Recipe";
import Image from "next/image";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

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

export const getStaticProps = async ({params}: { params: { slug: string } }) => {
    const entries: EntryCollection<Recipe> = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    });
    const recipe = entries.items[0];
    return {
        props: {
            recipe,
            revalidate: 1
        }
    };
};

export default function RecipeDetails({recipe}: { recipe: Entry<Recipe> }) {
    console.log(recipe);

    const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields;

    return (
        <div>
            <div className="banner">
                <Image
                    src={'https:' + featuredImage.fields.file.url}
                    width={featuredImage.fields.file.details.image?.width}
                    height={featuredImage.fields.file.details.image?.height}
                    alt={featuredImage.fields.description}
                />
                <h2>{title}</h2>
            </div>

            <div className="info">
                <p>Takes about {cookingTime} minutes to cook.</p>
                <h3>Ingredients</h3>

                {ingredients.map(ingredient => (
                    <span key={ingredient}>{ingredient}</span>
                ))}
            </div>

            <div className="method">
                <h3>Method</h3>
                <div>{documentToReactComponents(method)}</div>
            </div>

            <style jsx>{`
                h2, h3 {
                    text-transform: uppercase;
                }
                .banner h2 {
                    margin: 0;
                    background: #fff;
                    display: inline-block;
                    padding: 20px;
                    position: relative;
                    top: -60px;
                    left: -10px;
                    transform: rotateZ(-1deg);
                    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
                }
                
                .info p {
                    margin: 0;
                }
                
                .info span::after {
                    content: ', ';
                }
                
                .info span:last-child::after {
                    content: '.';
                }
            `}</style>
        </div>
    )
};
