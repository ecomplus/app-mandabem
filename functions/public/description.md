# Manda Bem

Intermediação de frete dos Correios (PAC/SEDEX/PACMINI) com valores mais acessíveis via [Manda Bem](https://www.mandabem.com.br/):

- Cálculo de frete consumindo o webservice do Manda Bem;
- Permite configuração de regras de envio para aplicação de frete grátis, com desconto, valor adicional ou fixo por região (faixa de CEP), código de serviço e/ou valor da compra;
- Geração automática de etiquetas de envio no Manda Bem quando o pedido é alterado para _preparado para envio_.

## Integração

Acesse o [Manda Bem](https://mandabem.com.br/integracao) nesse link ou acesse sua conta e vá em integração:

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/1.png)

Vá ate o final da página e acione **Ativar Web Service**:

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/2.png)

Será mostrado uma confirmação na tela:

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/3.png)

Copie o código gerado. Ele será usado na configuração da E-Com Plus nos próximos passos:

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/4.png)


Faça a instalação do app da [E-Com Plus](https://app.e-com.plus/#/apps/edit/119348):
1. Clique para instalar.
1. Vá na aba de configuração:

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/5.png)

- Preencha o CEP de origem.
- **API ID** e **API ToKen** que foram feitos no [Manda Bem](https://mandabem.com.br/integracao).
- Por padrão é gerado as etiquetas automaticamente, quando o pedido é colocado no status Pronto para envio . Caso queria **DESABILITAR** deixe a opção **marcada**.
- Salve as alterações.

#### Regras de envio.

Você pode selecionar o mesmo serviço de correio para definir regras diferentes de forma que haja uma condição que abranja todo o pais (nesse caso deixe a **Faixa de CEP** em branco) e outras regras mais específicas por região.

![exemplo](https://us-central1-ecom-mandabem.cloudfunctions.net/app/img/6.png)


