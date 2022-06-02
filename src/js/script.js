//console.log(produtos)


const produtosLista = document.querySelector(".produtosLista")
const ListaProdutos = document.querySelector(".ListaProdutos")

//0) CRIAR UMA FUNÇÃO (CARDPRODUTO) => PRODUTO COMO PARAMETRO 
function criarcardProduto(produto) {
   
    //1) TAG HTML (LI)
  const tagLi = document.createElement("li")

  //2) ADICIONAR UMA TAG NA LI (CARDPRODUTO)
  tagLi.classList.add("cardProduto")

  //3) ALIMENTAR ESSA TAG COM OUTROS ELEMENTOS;
       //A) (IMG) IMAGEM DO PRODUTO
       //B) (H3) NOME PRODUTO
       //C) (P) PREÇO
       //D) (BUTTON) BOTÃO ADICIONAR NO CARRINHO
  //4) ALIEMNTAR COM INFORMAÇÕES DOS PRODUTOS 
  tagLi.innerHTML = `
        <img src="${produto.image}">
        <h3>${produto.nome}</h3>
        <p>${produto.preco}</p>
        <button type="button" id="${produto.id}">Adicionar</button>
  `

  return tagLi
}


function listarProdutos(listaprodutos){
 
  for(let i = 0; i<listaprodutos.length; i++){
       
       const produto = listaprodutos[i]

       const cardMontado = criarcardProduto(produto)

      produtosLista.appendChild(cardMontado)
     
  }
}
listarProdutos(produtos)

//CARRINHO DE COMPRAS
let carrinho = []

//ADICIONANDO INTERCEPTADOR NA LISTA DE PRODUTOS
produtosLista.addEventListener("click", adicionarProdutoCarrinho)
function adicionarProdutoCarrinho(event){
   
    //IDENTIFICANDO ELEMMENTO CLICADO
  const botao = event.target

  //VERIFICANDO SE É UM BOTÃO
  if(botao.tagName == "BUTTON"){

      //RECUPERANDO ID => IDENTIFICADOR DO PRODUTO
      const idProduto = botao.id
 
      //PESQUISAR SE ESSE PRODUTO É EXISTENTE => BASE
      const produtoFiltrado = produtos.find((produto)=> produto.id == idProduto)
      
      //ADICIONANDO PRODUTOS NO CARRINHO
      carrinho.push(produtoFiltrado)
      
      //LISTAR NA TELA DOS PRODUTO
      listarProdutosCarrinho()

      //LISTAR NA TELA DOS PRODUTOS
      atualizarTotal()
    }

}

//LISTAR PRODUTO DO CARRINHO
function listarProdutosCarrinho(){

    ListaProdutos.innerHTML = ""
   
    //PERCORRENDO PRODUTOS DO CARRINHO
    for(let i = 0; i<carrinho.length; i++){

        //RECUPERANDO CADA PRODUTO
        const produto = carrinho[i]
    
        //CRIAR O TEMPLATE
        const tagLi = document.createElement("li")
        tagLi.classList.add("cardProduto")

        tagLi.innerHTML = `
            <!-- NOME/FOTO PRODUTO -->
            <div class="infoNome">
                <img src="${produto.image}" alt="${produto.nome}">
                <p>${produto.nome}</p>
                </div>

                <!-- PREÇO PRODUTO -->
                <div class="infoPreco">
                    <p>R$${produto.preco.toFixed(2)}</p>
                    <button>
                        <img src="./src/assets/lixo.png" alt="Lixo para remover produto">
                    </button>
                </div>
            `
            
            ListaProdutos.appendChild(tagLi)
    }
}

//ATUALIZAR TOTAL CARRINHO

function atualizarTotal(){

  const infoPreco = document.querySelector(".infoPreco")
 

  let total = 0
  for(let i = 0; i < carrinho.length; i++){

   const produto = carrinho[i]

    total += produto.preco

  }
  infoPreco.innerText = `Total: R$ ${total.toFixed(2)}`
  
}

const listaProdutosCarrinho = document.querySelector(".ListaProdutos")
listaProdutosCarrinho.addEventListener("click", removerProdutoCarrinho)

function removerProdutoCarrinho(event){
    const botaoExcluir = event.target

    if(botaoExcluir.tagName == "BUTTON"){

        //REMOVENDO APENAS NO HTML
        //https://developer.mozilla.org/en-US/docs/web/API/Element/closest
       botaoExcluir.closest("li").remove()
       
       //produto <= FILTRO COM O FIND
       //posiçao numerica <= carrinho.INDEXOF(produto)
       //carinho.SPLICE(posicao, 1)
    }
}