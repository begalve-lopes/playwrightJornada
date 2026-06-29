import { expect, Locator, Page } from "@playwright/test";
import FormBaseCadastroEPerfil from "./FormBaseCadastroEPerfil";
import { Perfil } from "../util/gerarPerfil";

export default class PaginaCadastro {
    private readonly page: Page;
    private readonly formBase: FormBaseCadastroEPerfil;

    private readonly botaoVisitarPaginanaCadastro: Locator;

    private readonly checkboxTermos: Locator;
    private readonly botaoSubmeterForm: Locator;



    constructor(page: Page) {
        this.page = page;
        this.formBase = new FormBaseCadastroEPerfil(page)

        this.botaoVisitarPaginanaCadastro = page.getByRole('button', { name: 'CADASTRE-SE' });
        this.botaoSubmeterForm = page.getByRole('button', { name: 'Cadastrar' });
        this.checkboxTermos = page
            .getByRole('checkbox', { name: 'Li e aceito os termos e condi' });
    }

    async visitar() {
        await this.page.goto('/');
        await this.botaoVisitarPaginanaCadastro.click();
        await expect(this.page).toHaveURL('/auth/cadastro');
    }

    async preencherFormulario(perfil:Perfil) {
        await this.formBase.preencherFormulario(perfil)
        await this.checkboxTermos.check();

    }

    async submeterFormulario() {
        await this.botaoSubmeterForm.click();
    }

    async cadastroFeitoComSucesso() {
        await expect(this.page).toHaveURL('/auth/login');
    }

    async estaMostrandoMensagemErro(mensagem: string) {
        const elementoErro = this.page.getByText(mensagem);
        await expect(elementoErro).toBeVisible();
    }
}