import { expect, Locator, Page } from "@playwright/test";
import FormBaseCadastroEPerfil from "./FormBaseCadastroEPerfil";
import { Perfil } from "../util/gerarPerfil";

export default class PaginaPerfil {
    private readonly page: Page;
    readonly formBase: FormBaseCadastroEPerfil;
    private readonly linkPerfil: Locator;
    private readonly botaoDeslogar: Locator;
    private readonly botaoSubmeterForm: Locator;
    private readonly botaoLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formBase = new FormBaseCadastroEPerfil(page)

        this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');

        this.linkPerfil = page.getByTestId('header-link-perfil');
        this.botaoDeslogar = page.getByTestId('form-base-botao-deslogar');
        this.botaoLogin = page.getByTestId('botao-login');

    }

    async visitar() {
        await this.page.goto('/')
        await this.linkPerfil.click()
        await expect(this.page).toHaveURL('/auth/perfil')
    }

    async atualizarUsuario(perfil: Perfil) {
        await this.formBase.preencherFormulario(perfil)
    }

    async submeterAtualizacao() {
        await this.botaoSubmeterForm.click();
    }

    async atualizadoComSucesso() {
        await expect(this.page).toHaveURL('/home')
    }

    async fazerLogout(){
        await this.botaoDeslogar.click()
    }

    async validarLogout(){
        await expect(this.page).toHaveURL('auth/login')
        await expect(this.botaoLogin).toHaveText('Login', {ignoreCase:true})
        await expect(this.linkPerfil).not.toBeVisible()
    }
}