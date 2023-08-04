import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza-service';
import { OrderItems } from '../OrderItems';

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
  selectedItems: OrderItems[] = [];

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaSizes = this.pizzaService.getPizzaSizes();
    this.vegToppings = this.pizzaService.getVegToppings();
    this.nonVegToppings = this.pizzaService.getNonVegToppings();
    this.offers = this.pizzaService.getOffers();
  }

  handleCheckboxChange(topping: any, size: any, checked: boolean) {
    // Find an existing order item for the selected size
    const existingItem = this.selectedItems.find(item => item.size === size.name);

    if (existingItem) {
      // Add or update the topping in the existing item
      const top = {
        toppingName: topping.name,
        toppingPrice: topping.price,
        check: checked
      };

      if (checked) {
        existingItem.toppings.push(top);
        existingItem.totalCost += topping.price;
      } else {
        // Remove the topping and update the total cost
        const index = existingItem.toppings.findIndex(toppingItem => toppingItem.toppingName === topping.name);
        if (index !== -1) {
          existingItem.toppings.splice(index, 1);
          existingItem.totalCost -= topping.price;
          if (existingItem.toppings.length == 0) { existingItem.totalCost = 0; }
        }
      }
      // Apply offer to the existing item
      this.applyOffer(existingItem);
    }
    else {
      // Create a new order item for the selected size
      const newItem: OrderItems = {
        size: size.name,
        toppings: checked
          ? [{ toppingName: topping.name, toppingPrice: topping.price, check: checked }]
          : [],
        price: size.price,
        offerApplied: [],
        totalCost: checked ? size.price + topping.price : size.price
      };

      this.selectedItems.push(newItem);
      // Apply offer to the new item
      this.applyOffer(newItem);
    }
  }

  applyOffer(orderItem: OrderItems) {
    if (orderItem.size === 'Medium' && orderItem.toppings.length === 2) {
      orderItem.totalCost = 5;
      orderItem.offerApplied = 'Offer 1';
    }
    else if (orderItem.size === 'Medium' && orderItem.toppings.length === 4) {
      orderItem.totalCost = 9;
      orderItem.offerApplied = 'Offer 2';
    }
    else if (orderItem.size === 'Large' && orderItem.toppings.length >= 2) {
      orderItem.totalCost = orderItem.price + orderItem.toppings.reduce((acc, topping) => acc + topping.toppingPrice, 0);
      let isPepperoniTopping = false;
      let isBarbecueChickenTopping = false;
      for (let i = 0; i < orderItem.toppings.length; i++) {
        if (orderItem.toppings[i].toppingName === 'Pepperoni') {
          isPepperoniTopping = true;
        }
        if (orderItem.toppings[i].toppingName === 'Barbecue chicken') {
          isBarbecueChickenTopping = true;
        }
      }
      if (isPepperoniTopping && isBarbecueChickenTopping) {
        orderItem.totalCost = (orderItem.totalCost * 0.5);
        orderItem.offerApplied = 'Offer 3';
      }
      else if ((isPepperoniTopping || isBarbecueChickenTopping) && orderItem.toppings.length >= 3) {
        orderItem.totalCost = (orderItem.totalCost * 0.5);
        orderItem.offerApplied = 'Offer 3';
      }
      else if ((!isPepperoniTopping || !isBarbecueChickenTopping) && (orderItem.toppings.length >= 2 && orderItem.toppings.length <= 3)) {
        orderItem.offerApplied = null;
      }
      else if (orderItem.toppings.length >= 4) {
        orderItem.totalCost = (orderItem.totalCost * 0.5);
        orderItem.offerApplied = 'Offer 3';
      }
    }
    else {
      orderItem.totalCost = orderItem.price + orderItem.toppings.reduce((acc, topping) => acc + topping.toppingPrice, 0);
      if (orderItem.toppings.length == 0) { orderItem.totalCost = 0; }
      orderItem.offerApplied = null;
    }
  }
}

