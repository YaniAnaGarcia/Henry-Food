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
    const {data}= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`);
    
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
}
//traigo la info de la BD
const getDbInfo= async()=>{
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })
    
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
    const {name} = req.query;
    const allInfo = await getAllRecipes();
    
    if(name){
        const allRecipe = await allInfo.filter((rec)=> rec.title.toLowerCase().includes(name.toLowerCase()))
        //console.log("SOY",allRecipe)
        /* allRecipe.length > 0 ? res.status(200).send(allRecipe) : res.status(404).send('The recipe doesnt exist') */
        if(allRecipe.length){
            const result = allRecipe.map((rec)=>{
                return {
                    id: rec.id,
                    image: rec.image,
                    title: rec. title,
                    diets: rec.diets.map((d)=>d),
                    score: rec.spoonacularScore /*modifique*/ 
                }
            })
            return res.status(200).send(result)
        }
        res.status(404).send('The recipe doesnt exist')
       /*  allRecipe.length ? res.status(200).send(allRecipe) :
        res.status(404).send('The recipe doesnt exist') */
    }else{
        //res.send(allInfo)
        const info = allInfo.map((rec)=>{
            return {
                image: rec.image,
                title: rec. title,
                id: rec.id,
                diets: rec.diets.map((d)=>d),
                score: rec.spoonacularScore
            }
        })
        res.status(200).send(info)
    }  
})

//busco todos los tipos de dietas [] - uso el modelo Diets de mi DB
router.get('/types', async (req, res)=>{
    const diets = [
        "gluten free", 
        "dairy free", 
        "paleolithic", 
        "ketogenic", 
        "lacto ovo vegetarian", 
        "vegan", 
        "pescatarian", 
        "primal", 
        "fodmap friendly", 
        "whole 30"]

    diets.forEach(el => {
        Diet.findOrCreate({
            where: {name:el}
        })
    })
    
    const allTypes= await Diet.findAll()
    res.send(allTypes)
})


/* router.get('/types', async (req, res)=>{
    const info = await getApiInfo(); //toda la data de la 
    const dietsApi = info.map((e)=> e.diets)
    //console.log(dietsApi)
     const respuesta = dietsApi.flat().map((diet)=>{
        Diet.findOrCreate({
            where: {name: diet}
        })
    }) 
    //console.log(respuesta)
    //PARA DEVOLVER TODAS LAS DIETAS Q TENEMOS EN LA BD
    const allDiet = await Diet.findAll();
    //console.log(allDiet)
    res.send(allDiet)
}) */
//POST crear una ueva receta
router.post('/recipe', async (req, res)=>{
    const {title, summary, spoonacularScore, healthScore, instructions, diets, created} = req.body
    //console.log("BODY", title, summary, spoonacularScore, healthScore, instructions, diets)
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

    //creo la relacion del personaje con los dietas de la bd
    recipeCreated.addDiet(dbDiets)
   // console.log("ACAA",recipeCreated)
    res.status(200).send('your recipe was successfully created')
})


router.get('/recipes/:id', async (req, res)=>{
    const {id} = req.params;
    
        if(id.length < 10){
            const apiId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`)
            const result = [{
                title: apiId.data.title,
                image: apiId.data.image,
                dishType: apiId.data.dishType,
                summary: apiId.data.summary,
                diets: apiId.data.diets,
                spoonacularScore: apiId.data.spoonacularScore,
                healthScore: apiId.data.healthScore,
                instructions: apiId.data.instructions
            }]
            console.log("AAA",result)
            return res.status(200).send(result)
        } else{
            const info = await getDbInfo();
            const recipeDbId = info.filter((receta)=> receta.id == id)
     console.log("aaa", recipeDbId)
        recipeDbId ? res.status(200).send(recipeDbId):
        res.status(404).send('the ID doesnt exists')  
        }
})

router.delete('/recipes/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        return await Recipe.destroy({
            where: {
                id: id
            },
        })
        
    } catch (error) {
        return res.send(error)
    }
})



module.exports = router;
