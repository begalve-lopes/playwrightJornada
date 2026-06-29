import { Locator, Page } from "@playwright/test";
import { Genero, Perfil } from "../util/gerarPerfil";

export default class FormBaseCadastroEPerfil {
    private readonly page: Page;

    private readonly inputNome: Locator;
    private readonly inputDataNascimento: Locator;
    private readonly inputCpf: Locator;
    private readonly inputCidade: Locator;
    private readonly inputTelefone: Locator;
    private readonly inputEstado: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly inputConfirmarEmail: Locator;
    private readonly inputConfirmarSenha: Locator;
    // private readonly botaoSubmeterForm: Locator;


    // Mapeamento limpo e tipado corretamente com o Enum corrigido
    private readonly mapeamentoGenero: Record<Genero, string> = {
        [Genero.FEMININO]: 'Feminino',
        [Genero.MASCULINO]: 'Masculino',
        [Genero.OUTRO]: 'Prefiro não informar'
    };

    constructor(page: Page) {
        this.page = page;

        this.inputNome = page.getByRole('textbox', { name: 'Nome' });
        this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento')
        this.inputCpf = page.getByRole('textbox', { name: 'CPF' });
        this.inputCidade = page.getByRole('textbox', { name: 'Cidade' });
        this.inputTelefone = page.getByRole('textbox', { name: 'Telefone' });

        this.inputEstado = page.getByRole('combobox', { name: 'Estado' });

        this.inputEmail = page.getByRole('textbox', { name: 'E-mail', exact: true });
        this.inputSenha = page.getByRole('textbox', { name: 'Senha', exact: true });
        this.inputConfirmarEmail = page.getByRole('textbox', { name: 'Confirmar E-mail' });
        this.inputConfirmarSenha = page.getByRole('textbox', { name: 'Confirmar Senha' });


    }

    async preencherFormulario(perfil: Perfil) {
        await this.inputNome.fill(perfil.nome);
        await this.inputDataNascimento.fill(perfil.dataNascimento);

        const textoDoGenero = this.mapeamentoGenero[perfil.genero];
        await this.page.getByRole('radio', { name: textoDoGenero }).click();

        await this.inputCpf.fill(perfil.cpf);
        await this.inputTelefone.fill(perfil.telefone);

        await this.inputCidade.fill(perfil.cidade);
        await this.inputCidade.press('Enter');

        await this.inputEstado.fill(perfil.estado);
        await this.inputEstado.press('Enter');

        await this.inputEmail.fill(perfil.email);
        await this.inputSenha.fill(perfil.senha);
        await this.inputConfirmarEmail.fill(perfil.email);
        await this.inputConfirmarSenha.fill(perfil.senha);

    }
    
    async obterValorInputEmail() {
        return this.inputEmail.inputValue();
    }

    
}