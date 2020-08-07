import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActiveCategory } from '../../interfaces/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public categories: ActiveCategory[];

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.http.getCategory().subscribe(categories =>
      this.categories = categories.map(value => ({value, active: true}))
    );
  }

  filterCategory(categoryValue) {
    this.categories.forEach(category => {
      if (category.value === categoryValue) {
        category.active = !category.active;
      }
    });
  }

  applyFilter() {
    const filterCategories = this.categories
      .filter(category => category.active)
      .map(category => category.value);
    this.http.activeCategories.next(filterCategories);
  }
}
