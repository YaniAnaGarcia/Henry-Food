const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../db');
const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const {data}= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    try {
        const apiRecipes = await data.results.map((rec)=>{
            return {
                image: rec.image,
                id: rec.id,
                title: rec.title,
                summary: rec.summary,
                spoonacularScore: rec.spoonacularScore,
                healthScore: rec.healthScore,
                diets: rec.diets,
            }
        })
        return apiRecipes;
    } catch (error) {
        console.log("getApiInfo" + error)
    }
    
}  



//traigo la info de la BD
const getDbInfo= async()=>{
    try {
        return await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes:[]
                }
            }
        })
    } catch (error) {
        console.log("getDbInfo", error)
    }
} 

//concateno toda la info para trabajar con ella
const getAllRecipes = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allRecipes = apiInfo.concat(dbInfo);

    return allRecipes;
} 


//RUTAS
//1- una ruta que me filtre por query (name) sino que devuelva la totalidad de las recetas

router.get('/recipes', async (req, res)=>{
    const {title} = req.query;
    const allInfo = await getAllRecipes();
    //console.log(allInfo)
    try {
        
        if(title){
            const allRecipe = await allInfo.filter((rec)=> rec.title.toLowerCase().includes(title.toLowerCase()))
            if(allRecipe.length){
                const result = allRecipe.map((rec)=>{
                    return {
                        id: rec.id,
                        image: rec.image,
                        title: rec. title,
                        diets: rec.diets.map((d)=>d),
                        score: rec.spoonacularScore ,
                        healthScore: rec.healthScore 
                    }
                })
                return res.status(200).send(result)
            }
            res.status(404).send('The recipe doesnt exist')
        }else{
            const info = allInfo.map((rec)=>{
                return {
                    image: rec.image,
                    title: rec. title,
                    id: rec.id,
                    diets: rec.diets.map((d)=>d),
                    score: rec.spoonacularScore,
                    healthScore: rec.healthScore,
                    created: rec.created
                }
            })
            res.status(200).send(info)
        } 
    } catch (error) {
        console.log("routeRecipes", error)
    } 
}) 

//busco todos los tipos de dietas [] - uso el modelo Diets de mi DB
router.get('/types', async (req, res)=>{
    const diets = [
        "gluten free", 
        "dairy free", 
        "paleolithic", 
        "lacto ovo vegetarian", 
        "vegan", 
        "pescatarian", 
        "primal", 
        "fodmap friendly", 
        "whole 30"]
    try {
        diets.forEach(el => {
            Diet.findOrCreate({
                where: {name:el}
            })
        })
        
        const allTypes= await Diet.findAll() 
        res.send(allTypes)
    } catch (error) {
        console.log("diets", error)
    }

    
}) 
//POST crear una ueva receta
router.post('/recipe', async (req, res)=>{
    const {title, summary, spoonacularScore, healthScore, instructions, diets, created} = req.body
    //console.log("BODY", title, summary, spoonacularScore, healthScore, instructions, diets)
    try {
        const recipeCreated = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            diets,
            created
        })
        
        const dbDiets = await Diet.findAll({
            where: {
                name : diets
            }
        })
        recipeCreated.addDiet(dbDiets)
       // console.log("ACAA",recipeCreated)
        res.status(200).send('your recipe was successfully created')
    } catch (error) {
        console.log("createRecipe", error)
    }
    
}) 


router.get('/recipes/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        if(id.length < 10){
            const apiId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`)
            const result = {
                title: apiId.data.title,
                image: apiId.data.image,
                summary: apiId.data.summary,
                diets: apiId.data.diets,
                spoonacularScore: apiId.data.spoonacularScore,
                healthScore: apiId.data.healthScore,
                instructions: apiId.data.instructions
            }
           // console.log("AAA",result)
            return res.status(200).send(result)
        } else{
            const recipeDb = await Recipe.findByPk(id, {include: Diet});
            const recipeDbFound = {
                title: recipeDb.title,
                image: recipeDb.image,
                summary: recipeDb.summary,
                diets: recipeDb.diets.map((d) => d.name),
                spoonacularScore: recipeDb.spoonacularScore,
                healthScore: recipeDb.healthScore,
                instructions: recipeDb.instructions, 
                created: recipeDb.created
            }
            //console.log("DB", recipeDbFound)
            recipeDbFound ? res.status(200).send(recipeDbFound):
            res.status(404).send('the ID doesnt exists')
        }
    } catch (error) {
        console.log("IdRecipes", error)
    }
}) 

/* router.delete('/recipes/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const recipeDeleted = await Recipe.destroy({
            where: {id: id},
        })
        recipeDeleted? res.status(200).send("The recipe was deleted") :
        res.status(404).send("could not delete the recipe")
    } catch (error) {
        return res.send(error)
    }
}) */

module.exports = router;
