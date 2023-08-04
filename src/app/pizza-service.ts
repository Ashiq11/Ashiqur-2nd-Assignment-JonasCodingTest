import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzaSizes = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 }
  ];

  vegToppings = [
    { name: 'Tomatoes', price: 1.00 },
    { name: 'Onions', price: 0.50 },
    { name: 'Bell pepper', price: 1.00 },
    { name: 'Mushrooms', price: 1.20 },
    { name: 'Pineapple', price: 0.75 }
  ];

  nonVegToppings = [
    { name: 'Sausage', price: 1.00 },
    { name: 'Pepperoni', price: 2.00 },
    { name: 'Barbecue chicken', price: 3.00 }
  ];

  offers = [
    { name: 'Offer 1 -', descriptin: '1 Medium with 2 toppings', price: 5 },
    { name: 'Offer 2 -', descriptin: '2 Medium Pizzas with 4 toppings each', price: 9 },
    { name: 'Offer 3 -', descriptin: '1 Large with 4 toppings(Pepperoni and Barbecue chicken are counted as 2 toppings)- 50% discount' }
  ];
  constructor() { }

  getPizzaSizes() {
    return this.pizzaSizes;
  }

  getVegToppings() {
    return this.vegToppings;
  }

  getNonVegToppings() {
    return this.nonVegToppings;
  }

  getOffers() {
    return this.offers;
  }
}
