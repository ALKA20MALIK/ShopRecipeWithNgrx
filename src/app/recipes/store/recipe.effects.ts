import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient,HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects{
    @Effect()
    recipeFetch=this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((recipe:RecipeActions.FetchRecipes)=>{

       return this.httpClient.get<Recipe[]>('https://ngrecipebook-ecc8e.firebaseio.com/recipes.json',{
            observe:'body',
            responseType:'json',
            //params:new HttpParams().set('auth',Token)
        })                              
    })
    .map( 
        (recipes)=>{
            console.log(recipes)
         //const  recipes:Recipe[]=response.json();
        
            for(let recipe of recipes){
                if(!recipe['ingredients'])
                {
                    console.log(recipe);

                    recipe['ingredients']=[];
                }
            }
            return {
                type:RecipeActions.SET_RECIPES,
                payload:recipes
            };
        }
    );

    @Effect({dispatch:false})
    recipeStore=this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action,state])=>{
        const req=new HttpRequest('PUT','https://ngrecipebook-ecc8e.firebaseio.com/recipes.json',state.recipes);
        return this.httpClient.request(req);
    });

    constructor(private actions$:Actions,private httpClient:HttpClient,
        private store :Store<fromRecipe.FeatureState>){

    }
}