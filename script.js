document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.querySelector('.produtos-container');

    // Dados de exemplo de produtos
    const produtos = [
        {
            nome: "CHELSEA SAFETY BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CHELSEA_SAFETY_BOOT.jpg",
            id:1
        },
        {
            nome: "MERCURY SAFETY BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/MERCURY_SAFETY_BOOT.jpg",
            id:2
        },
        {
            nome: "HIKER SAFETY SHOE",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/HIKER_SAFETY_SHOE.jpg",
            id:3
        },
        {
            nome: "ULINDA SZ BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/ULINDA_SZ_BOOTS.jpg",
            id:4
        },
        {
            nome: "LYNX 8.0 SZ BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/LYNX_8.0_SZ_BOOT.jpg",
            id:5
        },
        {
            nome: "CLASSIC BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CLASSIC_BOOT.jpg",
            id:6
        },
        {
            nome: "VIPER PRO 8' SZ CT WIDE BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/VIPER_PRO_8_SZ_CT_WIDE_BOOT.jpg",
            id:7
        },
        {
            nome: "PATRIOT COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/PATRIOT_COMBAT_BOOT.jpg",
            id:8
        },
        {
            nome: "KRONOS COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/KRONOS_COMBAT_BOOT.jpg",
            id:9
        },
        {
            nome: "REACTION COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/REACTION_COMBAT_BOOT.jpg",
            id:10
        },
        {
            nome: "CANVAS BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CANVAS_BOOTS.jpg",
            id:11
        },
        {
            nome: "TROOPER COMBAT BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/TROOPER_COMBAT_BOOTS.jpg",
            id:12
        },
        {
            nome: "COMBAT LEATHER BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/COMBAT_LEATHER_BOOTS.jpg",
            id:13
        },
        {
            nome: "ELITE COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
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
            <p><strong>${produto.preco}</strong></p>;
        
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

document.addEventListener("DOMContentLoaded", function() {
    const produtosdisponiveisContainer = document.querySelector('.produtosdisponiveis-container');


    // Dados de produtos no stock
    const produtosdisponiveis = [
        {
            nome: "CHELSEA SAFETY BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CHELSEA_SAFETY_BOOT.jpg",
            id:1
        },
        {
            nome: "MERCURY SAFETY BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/MERCURY_SAFETY_BOOT.jpg",
            id:2
        },
        {
            nome: "HIKER SAFETY SHOE",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/HIKER_SAFETY_SHOE.jpg",
            id:3
        },
        {
            nome: "ULINDA SZ BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/ULINDA_SZ_BOOTS.jpg",
            id:4
        },
        {
            nome: "LYNX 8.0 SZ BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/LYNX_8.0_SZ_BOOT.jpg",
            id:5
        },
        {
            nome: "CLASSIC BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CLASSIC_BOOT.jpg",
            id:6
        },
        {
            nome: "VIPER PRO 8' SZ CT WIDE BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/VIPER_PRO_8_SZ_CT_WIDE_BOOT.jpg",
            id:7
        },
        {
            nome: "PATRIOT COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/PATRIOT_COMBAT_BOOT.jpg",
            id:8
        },
        {
            nome: "KRONOS COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/KRONOS_COMBAT_BOOT.jpg",
            id:9
        },
        {
            nome: "REACTION COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/REACTION_COMBAT_BOOT.jpg",
            id:10
        },
        {
            nome: "CANVAS BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/CANVAS_BOOTS.jpg",
            id:11
        },
        {
            nome: "TROOPER COMBAT BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/TROOPER_COMBAT_BOOTS.jpg",
            id:12
        },
        {
            nome: "COMBAT LEATHER BOOTS",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/COMBAT_LEATHER_BOOTS.jpg",
            id:13
        },
        {
            nome: "ELITE COMBAT BOOT",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1700,99 MT",
            imagem: "images/ELITE_COMBAT_BOOT.jpg",
            id:14
        }
    ];


    // Função para criar o HTML dos produtos
    produtosdisponiveis.forEach(produtosdisponiveis => {
        const produtosdisponiveisDiv = document.createElement('div');
        produtosdisponiveisDiv.classList.add('produto');
        produtosdisponiveisDiv.innerHTML = `
            <img src="${produtosdisponiveis.imagem}" alt="${produtosdisponiveis.nome}">
            <h3>${produtosdisponiveis.nome}</h3>
            <p>${produtosdisponiveis.descricao}</p>
            <p><strong>${produtosdisponiveis.preco}</strong></p>
            <button class="adicionar-carrinho" data-id="${produtosdisponiveis.id}" data-nome="${produtosdisponiveis.nome}" data-preco="${produtosdisponiveis.preco}" data-imagem="${produtosdisponiveis.imagem}">Adicionar ao carrinho</button>
            `;
        produtosdisponiveisContainer.appendChild(produtosdisponiveisDiv);
    });


    // Adicionando o evento ao botão "Adicionar ao Carrinho"
    const botoesCarrinho = document.querySelectorAll('.adicionar-carrinho');
    
    botoesCarrinho.forEach(button => {
        button.addEventListener('click', function() {
            const produtosdisponiveisId = this.dataset.id;
            const produtosdisponiveisNome = this.dataset.nome;
            const produtosdisponiveisPreco = this.dataset.preco;
            const produtosdisponiveisImagem = this.dataset.imagem;

            // Criando um objeto para o item
            const itemCarrinho = {
                id: produtosdisponiveisId,
                nome: produtosdisponiveisNome,
                preco: produtosdisponiveisPreco,
                imagem: produtosdisponiveisImagem,
                quantidade: 1  // Começamos com 1 unidade
            };

            // Verificar se o item já está no carrinho
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

            const index = carrinho.findIndex(item => item.id === produtosdisponiveisId);
            
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
            alert(`${produtosdisponiveisNome} foi adicionado ao carrinho!`);
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

