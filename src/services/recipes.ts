import {RecipeCollection} from "../db/models/recipeSchema";

export const parseQuery = (query)=>{
    if(typeof  query.name !== 'string') return ''
    return query
}

export const getRecipes = async(userId, name)=>{
     const recipes =   await RecipeCollection.find({
            userId,
            name: { $regex: name, $options: 'i' }
        })

    return recipes
}

export const postRecipe = async(recipe, user) =>{
    console.log(user)
   return await RecipeCollection.create({...recipe, userId: user._id})

}