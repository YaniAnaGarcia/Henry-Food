import axios from 'axios';
//creo las constantes
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const SEARCH_BY_TITLE= "SEARCH_BY_TITLE";
export const FILTER_BY_DIET= "FILTER_BY_DIET";
export const ORDER_BY_TITLE= "ORDER_BY_TITLE";
export const ORDER_BY_SCORE= "ORDER_BY_SCORE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const POST_RECIPES = "POST_RECIPES"

//defino los actions creators

//traerme todas las recetas de la ruta principal /recipes

export function getAllRecipes (){
    return async function (dispatch){
        const allRecipes = await axios.get('http://localhost:3001/recipes')
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: allRecipes.data
        })
    }
}
//busqueda por nombre (searchbr)
export function searchByTitle (title){
    return async function (dispatch){
        const searchTitle = await axios.get(`http://localhost:3001/recipes?name=${title}`)
        return dispatch({
            type:SEARCH_BY_TITLE,
            payload:searchTitle.data
        })
    }
}
//me traigo la ruta de los tipos de dietas del back
export function getAllDiets (){
    return async function (dispatch){
        const diets = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: GET_ALL_DIETS,
            payload: diets.data
        })
    }
}
//filtrar por dieta
export function filterByDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload,
    }
}
// ordenar alfabeticamente
export function orderByTitle(payload){
    return{
        type: ORDER_BY_TITLE,
        payload
    }
}
//ordenar por puntaje
export function orderByScore (payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    }
}
export function getDetail(id){
    return async function (dispatch){
        const detail = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: detail.data
        })
    }
}

//creacion de receta
export function createRecipe(payload){
    return async function (){
        const newRecipe = await axios.post('http://localhost:3001/recipe', payload);
        return newRecipe
    }
}