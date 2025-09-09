import mongoose, {Schema, Types} from "mongoose";

export const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: {
            values: ['Easy', 'Medium', 'Hard'],

        }
    },
    ingredients: {
        type: [String],
        required: true,

    },
    instructions: {
        type: String,
        required: true,
    },
    userId:{
        type: Types.ObjectId,
        required: true,

    }

}, {
    timestamps: true,
    versionKey: false
});

recipeSchema.index({
    name: 'text',
    description: 'text',
    ingredients: 'text',
    instructions: 'text',
});

export const RecipeCollection = mongoose.model('recipe', recipeSchema)