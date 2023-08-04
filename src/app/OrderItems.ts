export class OrderItems {
    public size: string = "";
    public toppings: any[] = [{
        toppingName: '', toppingPrice: 0, check: false
    }];
    public price: number = 0;
    public offerApplied: any = '';
    public totalCost: number = 0;
}