export interface ActiveCategory {
  value: string;
  active: boolean;
}

export interface DrinkCategory {
  value: string;
  drinkList: Drink[];
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface Category {
  strCategory: string;
}
