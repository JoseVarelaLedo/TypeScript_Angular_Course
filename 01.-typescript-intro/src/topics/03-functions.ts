// function addNumbers (a:number, b:number){
//     return a +b;
// }


// const addNumbersLambda = (a: number, b: number):string => {
//     return `${a +b}`;
// }

// function multiply (firstNumber:number, secondNumber?:number, base:number = 10) {
//     return firstNumber * base;
// }

interface Character {
    name:string;
    hp: number;
    showHp:() => void
}


const healCharacter = (character:Character, amount:number) =>{
    character.hp += amount;
}

const gandalf : Character = {
    name: 'Gandalf',
    hp: 50,
    showHp() {
        console.log (this.hp);   
    },
};

healCharacter(gandalf, 30);

console.log ({gandalf});

export {};