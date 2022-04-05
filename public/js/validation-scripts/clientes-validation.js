clientesValid = {
    rule: {
        nome: {
            required: true,
            minlength: 4,
            maxlength: 20,
            //rangelength: [3, 4] //Realiza a mesma coisa dos anteriores
        },
        sexo: {
            required: true,
            minlength: 4,
            maxlength: 15,
            //range: [10, 15] //Realiza a mesma coisa dos anteriores
        },
        rg: {
            required: true,
            minlength: 7,
            //range: [10, 15] //Realiza a mesma coisa dos anteriores
        },
        data_nasc: {
            required: true,
            minlength: 8,
            maxlength: 10,
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
        sexo: {
            minlength: "O sexo deve ter no mínimo {0}",
            maxlength: "O sexo dete ter no máximo  {0}",
            required: 'O  sexo é obrigatório',
        },
        rg: {
            minlength: (val) => {
                return `O RG deve ter ${val} de ${this.document.forms['clientes']['rg'].value.length} caracteres`;
            },
            required: 'O RG é obrigatório',
        },
        data_nasc: {
            minlength: (val) => {
                return `A data de nascimento deve ter no mínimo ${this.document.forms['clientes']['data_nasc'].value.length} de ${val}`;
            },
            maxlength: "A data de nascimento dete ter no máximo {0}",
            required: 'A data de nascimento é obrigatória',
        }
    }
}