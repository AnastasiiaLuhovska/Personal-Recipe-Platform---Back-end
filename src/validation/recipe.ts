import Joi from "joi";

export const recipeSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Recipe name is required',
            'string.min': 'Recipe name must be at least 3 characters',
            'string.max': 'Recipe name must be less than 100 characters'
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters',
            'string.max': 'Description must be less than 500 characters'
        }),

    cookTime: Joi.number()
        .integer()
        .min(1)
        .max(480)
        .required()
        .messages({
            'number.base': 'Cook time must be a number',
            'number.min': 'Cook time must be at least 1 minute',
            'number.max': 'Cook time must be less than 8 hours',
            'any.required': 'Cook time is required'
        }),

    servings: Joi.number()
        .integer()
        .min(1)
        .max(20)
        .required()
        .messages({
            'number.base': 'Servings must be a number',
            'number.min': 'Servings must be at least 1',
            'number.max': 'Servings must be less than 20',
            'any.required': 'Servings is required'
        }),

    difficulty: Joi.string()
        .valid('Easy', 'Medium', 'Hard')
        .required()
        .messages({
            'any.only': 'Difficulty must be Easy, Medium, or Hard',
            'any.required': 'Difficulty is required'
        }),

    ingredients: Joi.array()
        .items(
            Joi.string()
                .trim()
                .min(2)
                .required()
                .messages({
                    'string.min': 'Ingredient must be at least 2 characters',
                    'string.empty': 'Ingredient cannot be empty'
                })
        )
        .min(2)
        .required()
        .messages({
            'array.min': 'Recipe must have at least 2 ingredients',
            'any.required': 'Ingredients are required'
        }),

    instructions: Joi.string()
                .trim()
                .min(5)
                .required()
                .messages({
                    'string.min': 'Instruction must be at least 5 characters',
                    'string.empty': 'Instruction cannot be empty'
                })

});

export default recipeSchema;