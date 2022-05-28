import axios from 'axios';
//creo las constantes
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const SEARCH_BY_TITLE= "SEARCH_BY_TITLE";
export const FILTER_BY_DIET= "FILTER_BY_DIET";
export const ORDER_BY_TITLE= "ORDER_BY_TITLE";
export const ORDER_BY_SCORE= "ORDER_BY_SCORE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const POST_RECIPES = "POST_RECIPES";
export const FILTER_HELTHY = "FILTER_HELTHY";
export const DELETE_DETAIL = "DELETE_DETAIL";
export const DELETE_RECIPE_CREATED = "DELETE_RECIPE_CREATED";
//defino los actions creators

export function getAllRecipes (){
    return async function (dispatch){
        try {
            const allRecipes = await axios.get('/recipes')
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: allRecipes.data
            })
        } catch (error) {
            console.log("getAllRecipes", error)
        }
    }
}

export function searchByTitle (title){
    return async function (dispatch){
        try {
            const searchTitle = await axios.get(`/recipes?title=${title}`)
            return dispatch({
                type:SEARCH_BY_TITLE,
                payload:searchTitle.data
            })
        } catch (error) {
           alert("no se encontro lo que buscabas")
        }
    }
}

export function getAllDiets (){
    return async function (dispatch){
        try {
            const diets = await axios.get('/types')
            return dispatch({
                type: GET_ALL_DIETS,
                payload: diets.data
            })
        } catch (error) {
            console.log("getAllDiets", error)
        }
    }
} 

export function filterByDiet(payload){
    try {
        return{
            type: FILTER_BY_DIET,
            payload,
        }
    } catch (error) {
        console.log("filterByDiet", error)
    }
}

export function orderByTitle(payload){
    try {
        return{
            type: ORDER_BY_TITLE,
            payload
        }
    } catch (error) {
        console.log("orderByTitle", error)
    }
}

export function orderByScore (payload){
    try {
        return{
            type: ORDER_BY_SCORE,
            payload
        }
    } catch (error) {
        console.log("orderByScore", error)
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            const detail = await axios.get(`/recipes/${id}`)
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: detail.data
            })
        } catch (error) {
            console.log("getDetail", error)
        }
    }
}

export function createRecipe(payload){
    return async function (){
        const newRecipe = await axios.post('/recipe', payload);
        return newRecipe
    }
}
//limpie el estado de detail
export function deletDetail(){
    return{
        type: DELETE_DETAIL,
    }
}

/* export function deleteRecipe(id){
    return async function (dispatch){
        const detail = await axios.delete(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: DELETE_RECIPE_CREATED,
            payload: detail.data
        })
    }
} */




