export class Usuario {
    constructor(
        public id: string,
        public name: string,
        public password: string,
        public email: string,
        public cpf: string,
        public tel: string,
        public role: string
    ) { }
}