alunosValid = {
    rule: {
        nome: {
            required: true,
            minlength: 4,
            maxlength: 20,
            //rangelength: [3, 4] //Realiza a mesma coisa dos anteriores
        },
        curso: {
            required: true,
            minlength: 4,
            maxlength: 15,
            //range: [10, 15] //Realiza a mesma coisa dos anteriores
        },
        cpf: {
            required: true,
            minlength: 14,
            //range: [10, 15] //Realiza a mesma coisa dos anteriores
        },
        matricula: {
            required: true,
            minlength: 4,
            maxlength: 15,
            //min: 10, // para de o valor nimimo de um campo
            //max: 15, //// para de o valor nimimo de um campo
            //range: [10, 15] //Realiza a mesma coisa dos anteriores
        }
    },
    message: {
        nome: {
            minlength: "O nome deve ter no mínimo {0}",
            maxlength: "O nome dete ter no máximo  {0}",
            required: 'O nome é obrigatório',
        },
        curso: {
            minlength: "O curso deve ter no mínimo {0}",
            maxlength: "O curso dete ter no máximo  {0}",
            required: 'O  curso é obrigatório',
        },
        cpf: {
            minlength: (val) => {
                return `O CPF deve ter ${val} de ${this.document.forms['alunos']['cpf'].value.length} caracteres`;
            },
            required: 'O cpf é obrigatório',
        },
        matricula: {
            minlength: (val) => {
                return `A matrícula deve ter no mínimo ${this.document.forms['alunos']['matricula'].value.length} de ${val}`;
            },
            maxlength: "A matrícula dete ter no máximo {0}",
            required: 'A matrícula é obrigatório',
        }
    }
}