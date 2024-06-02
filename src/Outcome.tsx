import {Action} from "./Action";

export enum Result {
    Failure = 'Failure',
    MixedSuccess = 'Mixed Success',
    CompleteSuccess = 'Complete Success'
}

export const ResultDescription: {[result in Result]: string} = {
    [Result.Failure]: 'The user will fail to achieve their goal and will actively sour their situation. Describe the action and outcome in your own words.',
    [Result.MixedSuccess]: 'The user may achieve their goal, but in an inferior way or at some cost. Describe the action and outcome in your own words.',
    [Result.CompleteSuccess]: 'The user will successfully achieve what they were attempting and improve their situation. Describe the action and outcome in your own words.',
}

export class Outcome {
    result: Result;
    dieResult1: number;
    dieResult2: number;
    action: Action;
    total: number;

    constructor(dieResult1: number, dieResult2: number, action: Action) {
        const total = dieResult1 + dieResult2 + action.modifier;
        this.result = (total >= 10 ? Result.CompleteSuccess : (total >= 7 ? Result.MixedSuccess : Result.Failure));

        this.dieResult1 = dieResult1;
        this.dieResult2 = dieResult2;
        this.action = action;
        this.total = this.dieResult1 + this.dieResult2 + this.action.modifier;
    }

    render() {
        const style = {
            width: '1em',
            height: 'auto'
        };
        return (
            <div>
                {this.result} (
                    <img src={`/assets/dice_${this.dieResult1}.png`} style={style} alt={`D6 showing ${this.dieResult1}`} />
                    <img src={`/assets/dice_${this.dieResult2}.png`} style={style} alt={`D6 showing ${this.dieResult2}`} />
                    + {this.action.modifier} = {this.total})
            </div>
        );
    }

    getDieEmoji(side: number): string {
        const emojiDice: {[key: number]: string} = {
            1: '\u2680',
            2: '\u2681',
            3: '\u2682',
            4: '\u2683',
            5: '\u2684',
            6: '\u2685'
        }
        return emojiDice[side];
    }

    getDescription(): string {
        return `###(${this.action.stat}) ${this.action.description}###\n#${this.getDieEmoji(this.dieResult1)} ${this.getDieEmoji(this.dieResult2)} ${this.action.modifier >= 0 ? '+' : ''}${this.action.modifier} = ${this.total} (${this.result})#`
    }
}