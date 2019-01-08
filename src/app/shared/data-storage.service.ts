import { Injectable } from "@angular/core";
import { HttpClient,HttpRequest, HttpHeaders, HttpParams} from '@angular/common/http'
import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService{
    constructor(private httpClient:HttpClient, 
        private recipeService:RecipeService){}

    storeRecipes(){
        //const Token= this.authService.getToken();
        const url='https://ngrecipebook-ecc8e.firebaseio.com/recipes.json';
        //const headers=new HttpHeaders().set('Authorization','alka')
        // return this.httpClient.put(url,
        //     this.recipeService.getRecipes(),{
        //         observe:'body',
        //         params:new HttpParams().set('auth',Token)
        //     });   
        //,{reportProgress:true,params:new HttpParams().set('auth',Token)}
        const req=new HttpRequest('PUT',url,this.recipeService.getRecipes());
        return this.httpClient.request(req);
    }
    fetchRecipes(){
         //const Token= this.authService.getToken();
         const url='https://ngrecipebook-ecc8e.firebaseio.com/recipes.json';
          //this.httpClient.get<Recipe[]>('https://ngrecipebook-ecc8e.firebaseio.com/recipes.json?auth='+Token)           
          
          this.httpClient.get<Recipe[]>(url,{
            observe:'body',
            responseType:'json',
            //params:new HttpParams().set('auth',Token)
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
            return recipes;
            })
            .subscribe(
                (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}