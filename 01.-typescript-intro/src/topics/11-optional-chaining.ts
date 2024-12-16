

export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: "Jose",
}

const passenger2: Passenger = {
    name: "Paula",
    children: ['Juan'],
}

const printChildren = ( passenger:Passenger ) =>{
    const howManyChildren = passenger.children!.length;
    console.log (passenger.name, howManyChildren);
    return howManyChildren;
}

printChildren (passenger1);