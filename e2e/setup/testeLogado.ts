import * as path from "path";
import * as fs from "fs"
import { test } from "./fixtures";
import PaginaCadastro from "../page_objects/PaginaCadastro";
import PaginaLogin from "../page_objects/PaginaLogin";
import { gerarPerfil } from "../util/gerarPerfil";
import { expect } from "@playwright/test";

export const testeLogado = test.extend<object, { arquivoInfoLogado: string }>({
    arquivoInfoLogado: [
        async ({ browser }, use) => {
            const id = test.info().parallelIndex;
            const caminhoArquivo = path.resolve(
                test.info().project.outputDir,
                `.auth/usuario-${id}.json`
            );

            if(fs.existsSync(caminhoArquivo)){
                await use(caminhoArquivo)
                return;
            }

            // 👇 Lê a baseURL diretamente do config do projeto
            const baseURL = test.info().project.use.baseURL ?? 'http://localhost:4200';

            const context = await browser.newContext({ baseURL });
            const page = await context.newPage();

            const paginaCadastro = new PaginaCadastro(page);
            const paginaLogin = new PaginaLogin(page);
            const novoUsuario = gerarPerfil();

            // CADASTRO
            await paginaCadastro.visitar();
            await paginaCadastro.preencherFormulario(novoUsuario);
            await paginaCadastro.submeterFormulario();

            await expect(page).toHaveURL('/auth/login');

            // LOGIN
            await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
            await paginaLogin.clicarBotaoAcessarConta()
            await expect(page).toHaveURL('http://localhost:4200/home');


            // SALVAR STATE
            await context.storageState({ path: caminhoArquivo });

            await use(caminhoArquivo);

            await page.close()
        },
        { scope: "worker" }
    ],

    storageState: async ({ arquivoInfoLogado }, use) => {
        await use(arquivoInfoLogado);
    },
});