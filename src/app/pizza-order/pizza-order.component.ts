import { Component, OnInit } from '@angular/core';
import { PizzaService} from '../pizza-service';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {
  
  pizzaSizes: any[] = [];
  vegToppings: any[] = [];
  nonVegToppings: any[] = [];
  offers: any[] = [];
  

  public selectedSize: any;
  selectedVegToppings: any[] = [];
  selectedNonVegToppings: any[] = [];
  selectedOffer: any;
  totalCost: number = 0;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaSizes = this.pizzaService.getPizzaSizes();
    this.vegToppings = this.pizzaService.getVegToppings();
    this.nonVegToppings = this.pizzaService.getNonVegToppings();
    this.offers = this.pizzaService.getOffers();
  }

  calculateTotalCost() {
    this.totalCost = this.selectedSize.price;
    this.selectedVegToppings.forEach(topping => {
      this.totalCost += topping.price;
    });
    this.selectedNonVegToppings.forEach(topping => {
      this.totalCost += topping.price;
    });
    console.log(this.selectedOffer)
    if (this.selectedOffer) {
      this.totalCost -= this.selectedOffer.price;
    }
  }

}
