import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Category, Drink } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public activeCategories: Subject<string[]> = new Subject();

  constructor(private http: HttpClient) {
  }

  getCategory() {
    return this.http.get(`${environment.APIUrl}/list.php?c=list`).pipe(
      map((drinkCategories: { drinks: Category[] }) => drinkCategories.drinks.map(category => category.strCategory)),
      tap(strCategories => this.activeCategories.next(strCategories))
    );
  }

  getDrinksByCategory(category) {
    return this.http.get(`${environment.APIUrl}/filter.php?c=${category}`).pipe(
      map((categoryDrinks: { drinks: Drink[] }) => ({value: category, drinkList: categoryDrinks.drinks}))
    );
  }
}
