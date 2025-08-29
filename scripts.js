

async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        return null;
    }
}

function validaCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false

    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false

    return true
}

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2, // Define o número mínimo de casas decimais
    maximumFractionDigits: 2  // Define o número máximo de casas decimais
});

function acao(id) {
    const txt = document.getElementById('mainText');
    const time = new Date().toLocaleString();
    txt.value = `Ação ${id} executada em ${time}.`;
};

function esconder_forms() {
    const formArea = document.getElementById("formArea");
    const forms = formArea.querySelectorAll("form");
    formArea.style.display = 'none'
    forms.forEach(f => f.style.display = "none");
};

function reparo_em_placa() {
    esconder_forms();
    const text = document.getElementById('mainText');
    text.value = '*ATENÇÃO REPARO EM PLACA*\r\n\r\nA autorização do reparo da placa é feita pelo cliente, logo, todos os riscos que porventura venha ocorrer se torna evidente na avaliação do técnico e por fim, na assinatura do check list. \r\n\r\nReitero que os equipamentos podem apresentar novas falhas, a depender dos processos de reparos. Deste modo, o(s) equipamento(s) corre(m) risco de perder alguma funcionalidade permanentemente, devido ao alto grau de dificuldade do reparo. \r\n\r\nTambém é de conhecimento do cliente que o equipamento passará por soldas e outros processos pertinentes para entrega do reparo solicitado. \r\n\r\nDito isso, reitero os riscos envolvidos nessa operação delicada de restauração do(s) seu(s) equipamento(s).\r\n\r\nQuaisquer dúvidas estamos a disposição.'
};

function informativo_whatsapp() {
    const txt = document.getElementById('mainText');
    const prazo_orc = document.getElementById('prazo_orc_form_1').value;
    const valor = formatadorMoeda.format(document.getElementById('valor_coleta_form_1').value);
    txt.value = `Recolheremos o equipamento de acordo com a data combinada e será enviada a Ordem de Serviço em PDF para você ler e concordar com os termos descriminados. \r\n\r\n> *Informações importantes:*\r\n\r\n- *Taxa de deslocamento:* ${valor} (Já inclui a recolha e a entrega da máquina na finalização do serviço)\r\nImportante ressaltar que o entregador não dispõe de conhecimento técnico, em casos de necessidade de desinstalação do equipamento na coleta, instalação do equipamento na entrega ou outro serviço que dependa de conhecimento técnico, consulte valores e horários para envio de um profissional capacitado.\r\n\r\n- *Prazo de orçamento:* ${prazo_orc} dias úteis\r\nO prazo poderá ser adiantado, de acordo com disponibilidade técnica. Em caso de necessidade de prorrogação avisaremos anteriormente.`;
};

function cobranca() {
    const txt = document.getElementById('mainText');
    const nome = document.getElementById('nome_cobranca').value;
    const vencimento = new Date(document.getElementById('vencimento').value + 'T00:00:00').toLocaleDateString();
    const valor_cobranca = formatadorMoeda.format(document.getElementById('valor_cobranca').value);
    txt.value = `Caro(a) ${nome},\r\n\r\n“Espero que você esteja bem. Gostaria de lembrá-lo(a) de que sua fatura no valor de R$ ${valor_cobranca} venceu em ${vencimento}. Até o momento, ainda não recebemos o pagamento.\r\n\r\nPor favor, lembre-se de que o pagamento em dia é importante para mantermos nosso relacionamento comercial saudável. Caso haja algum problema em relação ao pagamento, por favor, entre em contato conosco para que possamos trabalhar juntos em uma solução.\r\n\r\nAgradecemos sua atenção e aguardamos seu pagamento em breve.\r\n\r\nAtenciosamente,\r\n\r\nMax Ink Soluções em Informática`;
};

function coleta() {
    const text = document.getElementById('mainText');
    const valor = formatadorMoeda.format(document.getElementById('valor_deslocamento').value)
    const data_coleta = new Date(document.getElementById('data_coleta').value + 'T00:00:00').toLocaleDateString();
    const periodo = (document.querySelector('input[name="radio_periodo_coleta"]:checked').value == 'manha') ? 'Manhã (8:00 as 11:00)' : 'Tarde ( 13:00 as 17:00 )';
    text.value = `*AGENDAMENTO CONFIRMADO*\r\n\r\n> *COLETA*\r\n- *Taxa de deslocamento:* ${valor} \r\n- *Data:* ${data_coleta}\r\n- *Período:* ${periodo}\r\n\r\n> *INSTRUÇOES PARA COLETA*\r\n\r\n- Em caso de impressora não é necessário mandar os cabos, somente quando solicitado.\r\n- Em caso de notebook é necessário mandar a fonte.\r\n- Em caso de aparelhos telefone, enviar sem chip, cartão de memória e capinha.\r\n- Enviar impressora com seus suprimentos. (Tinta, Cartuchos, Toner)`;
};

function visita() {
    const text = document.getElementById('mainText');
    const valor_deslocamento = formatadorMoeda.format(document.getElementById('deslocamento_visita').value)
    const valor_visita = formatadorMoeda.format(document.getElementById('valor_visita').value)
    const data_visita = new Date(document.getElementById('data_visita').value + 'T00:00:00').toLocaleDateString();
    const periodo = (document.querySelector('input[name="radio_periodo_visita"]:checked').value == 'manha') ? 'Manhã (8:00 as 11:00)' : 'Tarde ( 13:00 as 17:00 )';
    text.value = `*AGENDAMENTO CONFIRMADO VISITA TÉCNICA*:\r\n\r\n\r\n- *Taxa de deslocamento:* ${valor_deslocamento}\r\n- *Taxa visita técnica:* ${valor_visita}\r\n- *Data:* ${data_visita} \r\n- *Período:*  ${periodo}\r\n\r\n> Instruções para Visita\r\n\r\n- Em caso de impressora tenham cabos e suprimentos (tinta, cartucho, folha, rede de internet) disponíveis no local.\r\n- Em caso de computadores tenha cabos e acesso a rede internet disponível no local.`;
}

// Copiar texto com duplo clique
document.getElementById('mainText').addEventListener('dblclick', function () {
    const text = this.value;
    if (text.trim() !== "") {
        navigator.clipboard.writeText(text).then(() => {
            alert("Texto copiado para a área de transferência!");
        }).catch(err => {
            console.error("Erro ao copiar:", err);
        });
    }
});

document.getElementById('input_cep_locador').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 5) + (value.length > 5 ? '-' + value.substring(5, 8) : ''); // Adiciona o hífen
    value = value.substring(0, 2) + '.' + value.substring(2); // Adiciona o ponto
    e.target.value = value;
});

document.getElementById('input_cep_locatario').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 5) + (value.length > 5 ? '-' + value.substring(5, 8) : ''); // Adiciona o hífen
    value = value.substring(0, 2) + '.' + value.substring(2); // Adiciona o ponto
    e.target.value = value;
});

document.getElementById('input_cep_imovel').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 5) + (value.length > 5 ? '-' + value.substring(5, 8) : ''); // Adiciona o hífen
    value = value.substring(0, 2) + '.' + value.substring(2); // Adiciona o ponto
    e.target.value = value;
});

document.getElementById('input_cpf_locador').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 3) + (value.length > 3 ? '.' + value.substring(3, 6) : '') +
        (value.length > 6 ? '.' + value.substring(6, 9) : '') +
        (value.length > 9 ? '-' + value.substring(9, 11) : ''); // Formata o CPF
    e.target.value = value;
});

document.getElementById('input_cpf_locatario').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 3) + (value.length > 3 ? '.' + value.substring(3, 6) : '') +
        (value.length > 6 ? '.' + value.substring(6, 9) : '') +
        (value.length > 9 ? '-' + value.substring(9, 11) : ''); // Formata o CPF
    e.target.value = value;
});

document.getElementById('input_cpf_locador').addEventListener('blur', function (e) {
    if (!validaCPF(e.target.value)) {
        alert("CPF inválido. Por favor, verifique o número informado.");
        e.target.value = ''; // Limpa o campo se o CPF for inválido
    }
});

document.getElementById('input_cpf_locatario').addEventListener('blur', function (e) {
    if (!validaCPF(e.target.value)) {
        alert("CPF inválido. Por favor, verifique o número informado.");
        e.target.value = ''; // Limpa o campo se o CPF for inválido
    }
});

document.getElementById('input_valor').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = (value / 100).toFixed(2); // Converte para formato monetário
    e.target.value = formatadorMoeda.format(value);
});

async function preencher_endereco(cep, key) {

    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {

        const endereco = await buscarCEP(cep);
        if (endereco) {
            document.getElementById('input_logradouro' + key).value = endereco.logradouro || '';
            document.getElementById('input_bairro' + key).value = endereco.bairro || '';
            document.getElementById('input_cidade' + key).value = endereco.localidade || '';
            document.getElementById('input_uf' + key).value = endereco.uf || '';
        } else {
            console.error("Endereço não encontrado para o CEP:", cep);
            alert("Não foi possível encontrar o endereço para o CEP informado.");
        }

    } else {
        console.error("CEP inválido:", cep);
        alert("Por favor, insira um CEP válido com 8 dígitos.");
    }
}

// Mostrar formulário
function mostrarFormulario(id) {


    switch (id) {
        case 'contrato_locacao_form':

            document.getElementById('input_data_assinatura').value = new Date().toISOString().split('T')[0];
            document.getElementById('input_data_inicio').value = new Date().toISOString().split('T')[0];

            break;

        default:
            break;
    }
    esconder_forms();

    const formSelecionado = document.getElementById(id);
    if (formSelecionado) {
        formArea.style.display = "flex"; // mostra a área
        formSelecionado.style.display = "flex"; // mostra o form
    }
}

function preencherDocumento(doc, dados) {
    // Preenche os campos do documento com os dados do contrato

    for (const key in dados) {

        if (dados.hasOwnProperty(key)) {
            const value = dados[key];
            const element = doc.querySelector(`#${key}`);
            if (element) {
                element.textContent = value;
            }
        }
    }
    // Exibe o documento preenchido no iframe
    const iframe = document.querySelector('iframe[src="contato_locacao.html"]');
    if (iframe) {
        const docContent = new XMLSerializer().serializeToString(doc);
        iframe.srcdoc = docContent;
    }
}

function gerarPDF() {
    const cl_residencial = 'A locação destina-se ao uso exclusivo como residência e domicilio do LOCATÁRIO.';
    const cl_comercial = 'A locação destina-se ao uso exclusivo como estabelecimento comercial do LOCATÁRIO.';

    const cl_residencial_8_comercial = 'O imóvel da presente locação destina-se ao uso exclusivo como residencial do LOCATÁRIO';
    const cl_comercial_8_residencial = 'O imóvel da presente locação destina-se ao uso exclusivo como estabelecimento comercial do LOCATÁRIO';

    esconder_forms();
    // Exemplo de dados para preencher o contrato
    const dadosContrato = {
        locador: document.getElementById('input_locador').value,
        locador_ass: document.getElementById('input_locador').value,
        cpf_locador: document.getElementById('input_cpf_locador').value,
        logradouro_locador: document.getElementById('input_logradouro_locador').value,
        n_locador: document.getElementById('input_n_locador').value,
        complemento_locador: document.getElementById('input_complemento_locador').value == "" ? '' : ', ' + document.getElementById('input_complemento_locador').value,
        bairro_locador: document.getElementById('input_bairro_locador').value,
        cidade_locador: document.getElementById('input_cidade_locador').value,
        uf_locador: document.getElementById('input_uf_locador').value,
        cep_locador: document.getElementById('input_cep_locador').value,
        locatario: document.getElementById('input_locatario').value,
        locatario_ass: document.getElementById('input_locatario').value,
        cpf_locatario: document.getElementById('input_cpf_locatario').value,
        logradouro_locatario: document.getElementById('input_logradouro_locatario').value,
        n_locatario: document.getElementById('input_n_locatario').value,
        complemento_locatario: document.getElementById('input_complemento_locatario').value == '' ? '' : ', ' + document.getElementById('input_complemento_locatario').value,
        bairro_locatario: document.getElementById('input_bairro_locatario').value,
        cidade_locatario: document.getElementById('input_cidade_locatario').value,
        uf_locatario: document.getElementById('input_uf_locatario').value,
        cep_locatario: document.getElementById('input_cep_locatario').value,
        finalidade: document.querySelector('input[name="radio_aluguel"]:checked').value,
        prazo: document.getElementById('input_prazo').value,
        data_inicio: new Date(document.getElementById('input_data_inicio').value + 'T00:00:00').toLocaleDateString('pt-BR'),
        valor: document.getElementById('input_valor').value,
        data_vencimento: document.getElementById('input_data_vencimento').value,
        formas_pgt: document.getElementById('input_formas_pgt').value,
        logradouro_imovel: document.getElementById('input_logradouro_imovel').value,
        n_imovel: document.getElementById('input_n_imovel').value,
        complemento_imovel: document.getElementById('input_complemento_imovel').value == '' ? '' : ', ' + document.getElementById('input_complemento_imovel').value,
        bairro_imovel: document.getElementById('input_bairro_imovel').value,
        cidade_imovel: document.getElementById('input_cidade_imovel').value,
        uf_imovel: document.getElementById('input_uf_imovel').value,
        cep_imovel: document.getElementById('input_cep_imovel').value,
        cidade: document.getElementById('input_cidade_imovel').value,
        cidade_ass: document.getElementById('input_cidade_imovel').value,
        dia: new Date(document.getElementById('input_data_assinatura').value).getDate(),
        mes: new Date(document.getElementById('input_data_assinatura').value).toLocaleString('pt-BR', { month: 'long' }),
        clausula_finalidade: document.querySelector('input[name="radio_aluguel"]:checked').value == 'comercial' ? cl_comercial : cl_residencial,
        clausula_finalidade_8: document.querySelector('input[name="radio_aluguel"]:checked').value == 'comercial' ? cl_comercial_8_residencial : cl_residencial_8_comercial,
    };
    const iframe = document.querySelector('iframe[src="contato_locacao.html"]');

    // const doc = iframe.contentDocument || iframe.contentWindow.document;
    const doc = 'contato_locacao.html';
    if (typeof doc === 'string') {
        // Se for uma string, significa que é o caminho do arquivo HTML
        fetch(doc)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                preencherDocumento(doc, dadosContrato);
            })
            .catch(error => console.error("Erro ao carregar o documento:", error));
    } else {
        preencherDocumento(doc, dadosContrato);
    }
    if (!doc) return;

    // Mostra a área de visualização do PDF
    document.querySelector('.pdf_viewer').style.display = 'flex';
}

function imprimir_pdf() {
    const iframe = document.querySelector('iframe[src="contato_locacao.html"]');
    if (iframe) {
        // Chama o método de impressão do iframe
        iframe.contentWindow.print();
    } else {
        console.error("Iframe não encontrado.");
    }
}


// Mensagem inicial
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainText').value = 'Bem-vindo! Clique em um botão para gerar texto.\nBotão 5 ou 6 mostra formulários.\nDê duplo clique aqui para copiar.';
});