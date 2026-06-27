import { test } from "../setup/fixtures"
import { gerarPerfil, Perfil } from "../util/gerarPerfil"

test.describe('Cadastro', () => {
    let novoUsuario: Perfil
    test.beforeEach(async ({ paginaCadastro }) => {
        await paginaCadastro.visitar();
        novoUsuario = gerarPerfil();
    })

    test('Deve conseguir fazer cadastro', async ({ paginaCadastro }) => {

        await paginaCadastro.preencherFormulario(novoUsuario);
        await paginaCadastro.submeterFormulario();
        await paginaCadastro.cadastroFeitoComSucesso()
    })

    test('Não Deve permitir usuário duplicado', async ({ paginaCadastro }) => {
        await paginaCadastro.preencherFormulario(novoUsuario);
        await paginaCadastro.submeterFormulario();
        await paginaCadastro.cadastroFeitoComSucesso()

        await paginaCadastro.visitar()
        await paginaCadastro.preencherFormulario(novoUsuario);
        await paginaCadastro.submeterFormulario();
        await paginaCadastro.estaMostrandoMensagemErro('E-mail já utilizado.')
    })

})