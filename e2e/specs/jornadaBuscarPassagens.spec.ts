import { test } from "../setup/fixtures";

test.describe('Buscar passagens', () => {
    test('Deve buscar passagens somente ida', async ({ paginaPrincipal }) => {
        await paginaPrincipal.definirSomenteIda();
        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(3);
        await paginaPrincipal.definirPassageirosCriancas(1);
        await paginaPrincipal.definirPassageirosBebes(1);
        await paginaPrincipal.fecharModalPassageiro();

        await paginaPrincipal.definirOrigemEdestino('minas gerais', 'rio de janeiro');
        await paginaPrincipal.definirData(new Date);
        await paginaPrincipal.buscarPassagens();
        await paginaPrincipal.estaMostarandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro');
    })
})