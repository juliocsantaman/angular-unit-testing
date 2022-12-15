export class Person {
    constructor(
        public name: string,
        public lastName: string,
        public age: number,
        public weight: number,
        public height: number
    ) {

    }

    calcIMC(): string {
        const result = Math.round(this.weight / (this.height * this.height));

        // 0 - 18 = down.
        // 19 - 24 = normal.
        // 25 - 26 = overweight.
        // 27 - 29 = overweight level 1.
        // 30 - 39 = overweight level 2.
        // 40 = overweight level 3.

        if(result >= 0 && result <= 18) {
            return 'down';
        }

        if(result >= 19 && result <= 24) {
            return 'normal';
        }

        if(result >= 25 && result <= 26) {
            return 'overweight';
        }

        if(result >= 27 && result <= 29) {
            return 'overweight level 1';
        }

        if(result >= 30 && result <= 39) {
            return 'overweight level 2';
        }

        if(result >= 40) {
            return 'overweight level 3';
        }

        return 'not found';
    }
}