

export class Person {
    

    constructor (
       public name:string, 
       private address?:string
    ) {}

}

// export class Hero extends Person {
//     constructor (
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super(realName, '');
//     }
// }

export class Hero  {    
    constructor (
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person:Person
    ){    }
}

const pepe = new Person ('Pepe', 'Casa de Pepe');
const pepeHero = new Hero('PepeChanclas', 46, 'Jose', pepe);

console.log ({pepeHero});