import { Product, taxCalculation } from "./06-function-destructuring";


const shoppingCart: Product[] = [
    {
        description: 'Samsung S22',
        price: 185.0
    },
    {
        description: 'Lenovo Pad',
        price: 270.0
    }

];                                                                                                                                                  

const tax = 0.21; //% IVA

const result = taxCalculation({tax: tax, products: shoppingCart});

const [baseImponible, iva] = result;
const total = baseImponible + iva;

console.log (`Base Imponible: ${baseImponible}    IVA: ${iva}    Total: ${total}`);