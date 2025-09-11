import {findRecipeById, getRecipes, parseQuery, postRecipe} from "../services/recipes";
import createHttpError from "http-errors";

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

export const getRecipesByIdController = async(req, res, next)=>{
    const {recipeId} = req.params
    const recipe = await findRecipeById(recipeId)
    if(!recipe) throw createHttpError(404, 'Recipe was not found')
    res.json({
        status: 200,
        message: 'Recipe was found successfully',
        recipe
    })
}