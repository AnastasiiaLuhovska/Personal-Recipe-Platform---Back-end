import {Router} from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper";
import {getRecipesController, postRecipeController} from "../controllers/recipes";
import {authentication} from "../middlewares/authentication";
import {validateBody} from "../middlewares/validateBody";
import recipeSchema from "../validation/recipe";

const router = Router()

router.use(authentication)
router.get('/',  ctrlWrapper(getRecipesController))
router.post('/', validateBody(recipeSchema), ctrlWrapper(postRecipeController))

export default router