const MachineOptions = require('./machine');
const inquirer = require('inquirer');
const options = require('../data/index');
const gameBy = require('../data/gameby');

class User extends MachineOptions{
    constructor({opt, name, selected}){
        super({opt});
        this._name = name;
        this._selected = selected;
        this._sort = this.sort();
    }

    set name(string){
        this.name = string;
    }

    set selected(string){
        this._selected = string;
    }

    get name(){
        return this._name;
    }

    get selected(){
        return this._selected;
    }
    

    logic(){
        if(this._selected === this.sort){
            return `${this.name} escolheu ${this.selected} e a máquina escolheu ${this._sort} - VOCÊ EMPATOU!!`
        } else if (
            (this.selected === 'Pedra' && this._sort === 'Tesoura') ||
            (this.selected === 'Papel' && this._sort === 'Pedra') ||
            (this.selected === 'Tesoura' && this._sort === 'Papel') 
            ) {
               return `${this.name} escolheu ${this.selected} e a máquina escolheu ${this._sort} - VOCÊ GANHOU!!`
            } else{
                return `${this.name} escolheu ${this.selected} e a máquina escolheu ${this._sort} - VOCÊ PERDEU!!`
            }
        }


    game(){
        console.info(gameBy)
        return inquirer.prompt([
            {
                name: 'name',
                message: 'Qual o seu nome?',
                default : 'Jogador'
            },
            {
                type: 'list',
                name: 'jokenpo',
                message: 'Selecione uma dessas opçoes: ',
                choices: options
            }
        ]).then((answers) => {
            this._name = answers.name;
            this._selected = answers.jokenpo
            console.info(`${this.logic()}`)
        })
    }
    }

module.exports = User;