document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.querySelector('.produtos-container');

    // Dados de exemplo de produtos
    const produtos = [
        {
            nome: "Capacete de Segurança",
            descricao: "Capacete de segurança resistente e confortável.",
            preco: "1432,87 MT",
            imagem: "images/capacete.jpg",
            id: 1
        },
        {
            nome: "Luva de Proteção",
            descricao: "Luva de proteção contra cortes e abrasões.",
            preco: "1432,87 MT",
            imagem: "images/luva.jpg",
            id: 2
        },
        {
            nome: "Botas de Segurança",
            descricao: "Botas de segurança com biqueira de aço.",
            preco: "1432,87 MT",
            imagem: "images/botas.jpg",
            id: 3
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
S