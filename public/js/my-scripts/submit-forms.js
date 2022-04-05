$(document).ready(function () {
    // Ações para salvar e atualizar aluno
    $('#buttonSave').click(function () {
        formSubmit = this.closest("form")

        var urlSubmit = $(formSubmit).attr('id')
        $.validator.setDefaults({
            errorClass: 'invalid',
            validClass: "valid",
            errorPlacement: function (error, element) {
                $(element)
                    .closest("form")
                    .find("span[for='" + element.attr("id") + "']")
                    .attr('data-error', error.text());
            },
            submitHandler: function (form) {
                var dataForm = $(form).serializeFields();
                var method = $(form).attr('method');

                $.post(`/${urlSubmit}/${method}`, dataForm, function (res) {
                    console.log('res', res[0]);
                    if (res[0] != '<') {
                        // TRATANDO ERROS DO BACKEND
                        $(form).find(`span[for="${res[0].param}"]`)[0].dataset.error = res[0].msg;
                        $(form).find(`#${res[0].param}`).attr('aria-invalid', 'true')
                        $(form).find(`#${res[0].param}`).addClass('invalid')
                        M.toast({ html: `Verifique o campo ${res[0].param}` })
                    } else {
                        M.toast({ html: `Cliente ${dataForm.nome} ${method == 'save' ? 'salvo' : 'editado'} com sucesso` })
                        setTimeout(() => {
                            window.location.href = `/${urlSubmit}`;
                        }, 1000);
                    }
                })
            }
        });

        $(formSubmit).validate({
            debug: true,
            rules: alunosValid.rule, 
            messages: alunosValid.message
        });
    })


    // Ações para buscar aluno pelo nome
    $('#getAlunoId').click(function () {
        search = $('#search').val()
        window.location.href = `/${urlSubmit}/${search}`
    })

    $('#getClienteId').click(function () {
        search = $('#search').val()
        window.location.href = `/${urlSubmit}/${search}`
    })

    // Ações para deletar aluno
    $('.buttonDelete').click(function () {
        deleteLink = $(this).attr('deleteLink')
        deleteName = $(this).attr('deleteName')
        $('#deleteLink').attr('href', deleteLink)
        $('#deleteLink').attr('deleteName', deleteName)
        $('#deleteMessage').html(`Deseja deletar o aluno(a) <span style="font-weight:bolder">${deleteName}</span> ?`)

    })

    $('#deleteLink').click(function () {
        deleteName = $(this).attr('deleteName')
        M.toast({ html: `O cliente ${deleteName} foi deletado(a) com sucesso` })
    })
})