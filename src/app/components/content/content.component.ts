import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DrinkCategory } from '../../interfaces/interfaces';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public drinks: DrinkCategory[];
  private categories: string[];
  private page = 0;

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.activeCategories.pipe(
      mergeMap(category => {
        this.categories = category;
        return this.httpService.getDrinksByCategory(category[0]);
      })
    ).subscribe(drinks => this.loadDrinkViewList(drinks));
  }

  loadDrinkViewList(drinks) {
    this.drinks = [drinks];
    this.page = 0;
    window.scroll(0, 0);
  }

  onScrollDown() {
    if (this.page === this.categories.length - 1) {
      return;
    }
    this.page += 1;
    this.httpService.getDrinksByCategory(this.categories[this.page])
      .subscribe(c => this.drinks.push(c));
  }
}
