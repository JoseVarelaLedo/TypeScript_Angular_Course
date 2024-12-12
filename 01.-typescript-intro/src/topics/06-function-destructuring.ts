
export interface Product {
    description:string;
    price:number;

}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet: Product = {
    description: 'iPad Air',
    price: 250.0
}

interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

export function taxCalculation ( options:TaxCalculationOptions ):number [] {
    let total = 0;
    const { tax, products } = options;
    
    products.forEach (({ price }) =>{
        // const { price } = product;
        total += price;
    });
    return [total, total * tax];

}

const shoppingCard =  [phone, tablet];
const tax = 0.21; //% IVA

const result = taxCalculation({tax: tax, products: shoppingCard});

const [baseImponible, iva] = result;
const total = baseImponible + iva;

console.log (`Base Imponible: ${baseImponible}    IVA: ${iva}    Total: ${total}`)

// export {};