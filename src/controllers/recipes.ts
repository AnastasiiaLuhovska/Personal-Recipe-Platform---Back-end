import {getRecipes, parseQuery, postRecipe} from "../services/recipes";

export const getRecipesController = async (req, res, next) => {
    const name = parseQuery(req.query)
    const userId = req.user._id;

    const data = await getRecipes(userId, name)
    res.json({
        status: 200,
        message: "Recipes were found successfully",
        data: data
    })
};


export const postRecipeController = async(req, res, next)=>{
    const data = await postRecipe(req.body, req.user)
    console.log( req.user)
    res.status(201).json({
        status: 201,
        message: 'Recipe was successfully created',
        data

    })
}