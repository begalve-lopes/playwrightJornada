import { testeLogado } from "../setup/testeLogado";
import { gerarPerfil } from "../util/gerarPerfil";

testeLogado.describe('Edição do Usuário', () => {
    testeLogado('Deve conseguir editar o perfil', async ({ paginaPerfil }) => {
        await paginaPerfil.visitar();
        const usarioAtualizado = gerarPerfil();
        const emailAtual = await paginaPerfil.formBase.obterValorInputEmail();
        await paginaPerfil.atualizarUsuario({ ...usarioAtualizado, email: emailAtual });
        await paginaPerfil.submeterAtualizacao();
        await paginaPerfil.atualizadoComSucesso();
    })

    testeLogado('Deve fazer logout', async ({paginaPerfil}) => {
        await paginaPerfil.visitar();
        await paginaPerfil.fazerLogout();
        await paginaPerfil.validarLogout();
    })
})