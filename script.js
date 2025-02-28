document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.querySelector('.produtos-container');

    // Dados atualizados de produtos
    const produtos = [
        {
            nome: "CHELSEA SAFETY BOOT",
            descricao: "Bota robusta e confortável, ideal para ambientes industriais, com biqueira de aço e sola antiderrapante.",
            preco: "1700,99 MT",
            imagem: "images/CHELSEA_SAFETY_BOOT.jpg",
            id:1
        },
        {
            nome: "MERCURY SAFETY BOOT",
            descricao: "Modelo reforçado com proteção contra impactos e resistência a óleo e produtos químicos.",
            preco: "1700,99 MT",
            imagem: "images/MERCURY_SAFETY_BOOT.jpg",
            id:2
        },
        {
            nome: "HIKER SAFETY SHOE",
            descricao: "Sapato de segurança estilo hiking, leve e confortável, ideal para longas jornadas de trabalho.",
            preco: "1700,99 MT",
            imagem: "images/HIKER_SAFETY_SHOE.jpg",
            id:3
        },
        {
            nome: "ULINDA SZ BOOTS",
            descricao: "Bota de segurança durável, com fechamento em zíper lateral para maior praticidade.",
            preco: "1700,99 MT",
            imagem: "images/ULINDA_SZ_BOOTS.jpg",
            id:4
        },
        {
            nome: "LYNX 8.0 SZ BOOT",
            descricao: "Bota tática resistente, projetada para ambientes extremos e operações militares.",
            preco: "1700,99 MT",
            imagem: "images/LYNX_8.0_SZ_BOOT.jpg",
            id:5
        },
        {
            nome: "CLASSIC BOOT",
            descricao: "Bota clássica de couro, confortável e estilosa para o dia a dia no trabalho.",
            preco: "1700,99 MT",
            imagem: "images/CLASSIC_BOOT.jpg",
            id:6
        },
        {
            nome: "VIPER PRO 8' SZ CT WIDE BOOT",
            descricao: "Modelo premium de bota tática, com ajuste largo e resistência a impactos extremos.",
            preco: "1700,99 MT",
            imagem: "images/VIPER_PRO_8_SZ_CT_WIDE_BOOT.jpg",
            id:7
        },
        {
            nome: "PATRIOT COMBAT BOOT",
            descricao: "Bota militar reforçada, resistente a intempéries e ideal para operações especiais.",
            preco: "1700,99 MT",
            imagem: "images/PATRIOT_COMBAT_BOOT.jpg",
            id:8
        },
        {
            nome: "KRONOS COMBAT BOOT",
            descricao: "Bota de combate projetada para máximo desempenho e conforto em terrenos difíceis.",
            preco: "1700,99 MT",
            imagem: "images/KRONOS_COMBAT_BOOT.jpg",
            id:9
        },
        {
            nome: "REACTION COMBAT BOOT",
            descricao: "Bota de reação rápida, leve e flexível para movimentação ágil em operações táticas.",
            preco: "1700,99 MT",
            imagem: "images/REACTION_COMBAT_BOOT.jpg",
            id:10
        },
        {
            nome: "CANVAS BOOTS",
            descricao: "Botas de lona reforçada, ideais para ambientes quentes e com boa ventilação.",
            preco: "1700,99 MT",
            imagem: "images/CANVAS_BOOTS.jpg",
            id:11
        },
        {
            nome: "TROOPER COMBAT BOOTS",
            descricao: "Bota de combate resistente e confortável, projetada para máxima tração e durabilidade.",
            preco: "1700,99 MT",
            imagem: "images/TROOPER_COMBAT_BOOTS.jpg",
            id:12
        },
        {
            nome: "COMBAT LEATHER BOOTS",
            descricao: "Bota de couro robusta, proporcionando durabilidade e resistência a intempéries.",
            preco: "1700,99 MT",
            imagem: "images/COMBAT_LEATHER_BOOTS.jpg",
            id:13
        },
        {
            nome: "ELITE COMBAT BOOT",
            descricao: "Bota de elite para operações táticas, com design ergonômico e sola antiderrapante.",
            preco: "1700,99 MT",
            imagem: "images/ELITE_COMBAT_BOOT.jpg",
            id:14
        }
    ];

    // Função para criar o HTML dos produtos
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>${produto.preco}</strong></p>
            <button class="adicionar-carrinho" data-id="${produto.id}" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}">Adicionar ao carrinho</button>
        `;
        produtosContainer.appendChild(produtoDiv);
    });

    // Adicionando o evento ao botão "Adicionar ao Carrinho"
    const botoesCarrinho = document.querySelectorAll('.adicionar-carrinho');
    
    botoesCarrinho.forEach(button => {
        button.addEventListener('click', function() {
            const produtoId = this.dataset.id;
            const produtoNome = this.dataset.nome;
            const produtoPreco = this.dataset.preco;
            const produtoImagem = this.dataset.imagem;

            // Criando um objeto para o item
            const itemCarrinho = {
                id: produtoId,
                nome: produtoNome,
                preco: produtoPreco,
                imagem: produtoImagem,
                quantidade: 1  // Começamos com 1 unidade
            };

            // Verificar se o item já está no carrinho
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

            const index = carrinho.findIndex(item => item.id === produtoId);
            
            if (index !== -1) {
                // Se já existir, aumenta a quantidade
                carrinho[index].quantidade += 1;
            } else {
                // Se não existir, adiciona o item
                carrinho.push(itemCarrinho);
            }

            // Atualiza o carrinho no localStorage
            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            // Verifique o conteúdo do carrinho no console
            console.log('Carrinho Atualizado:', JSON.parse(localStorage.getItem('carrinho')));

            // Exibe uma mensagem ou altera algum item da UI (opcional)
            alert(`${produtoNome} foi adicionado ao carrinho!`);
        });
    });

    // Página Carrinho - Exibir itens armazenados no localStorage
    if (document.getElementById('itens-carrinho')) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itensCarrinhoDiv = document.getElementById('itens-carrinho');
        const totalCarrinhoDiv = document.getElementById('total-carrinho');

        // Se o carrinho estiver vazio
        if (carrinho.length === 0) {
            itensCarrinhoDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
        } else {
            let total = 0;

            // Exibe os itens do carrinho
            carrinho.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-carrinho');
                itemDiv.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}" width="50">
                    <span>${item.nome}</span>
                    <span>R$ ${item.preco}</span>
                    <span>Quantidade: ${item.quantidade}</span>
                `;
                itensCarrinhoDiv.appendChild(itemDiv);

                // Calcula o total
                total += parseFloat(item.preco.replace("R$", "").replace(",", ".").trim()) * item.quantidade;
            });

            // Exibe o total
            totalCarrinhoDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
        }
    }
});
