import { test } from "../setup/fixtures";
import { gerarPerfil } from "../util/gerarPerfil";

test.describe('Login', () => {
    test('deve fazer login com sucesso', async ({ paginaLogin, paginaCadastro }) => {
        await paginaCadastro.visitar()
        const novoUsuario = gerarPerfil();
        await paginaCadastro.preencherFormulario(novoUsuario)
        await paginaCadastro.submeterFormulario()
        await paginaCadastro.cadastroFeitoComSucesso()

        await paginaLogin.visitar()
        await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha)
        await paginaLogin.clicarBotaoAcessarConta()
        await paginaLogin.loginFeitoComSucesso()
    })

    test('não deve fazer login com credenciais inválidas', async ({ paginaLogin }) => {
        await paginaLogin.visitar()
        await paginaLogin.fazerLogin('sistema.errado@gmail.com', '1234567890')
        await paginaLogin.clicarBotaoAcessarConta()
        await paginaLogin.estaMostrandoLoginFalhou('Você não está autorizado a acessar este recurso')
    })

    test('não deve fazer login com email vazios', async ({ paginaLogin }) => {
        await paginaLogin.visitar()
        await paginaLogin.fazerLogin('', '1234567890')
        await paginaLogin.estaMostrandoEmailVazio('E-mail é obrigatório')
    })

    test('não deve fazer login com senha vazios', async ({ paginaLogin }) => {
        await paginaLogin.visitar()
        await paginaLogin.fazerLogin('sistema@gmail.com', '')
        await paginaLogin.estaMostrandoSenhaVazio('')
    })


})
