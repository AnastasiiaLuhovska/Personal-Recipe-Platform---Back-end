import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {

    getRecipesByIdController,
    getRecipesController,
    postRecipeController
} from "../controllers/recipes";
import {authentication} from "../middlewares/authentication";
import {validateBody} from "../middlewares/validateBody";
import recipeSchema from "../validation/recipe";
import {validateId} from "../middlewares/validateId";

const router = Router()

router.use(authentication)
router.get('/',  ctrlWrapper(getRecipesController))
router.post('/', validateBody(recipeSchema), ctrlWrapper(postRecipeController))
router.get('/:recipeId', validateId, ctrlWrapper(getRecipesByIdController))

export default router