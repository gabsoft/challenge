const xhttp = new XMLHttpRequest();
const url = "http://localhost:3000/cart"
xhttp.open("GET", url)
xhttp.send()


xhttp.onreadystatechange=()=> {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    const responseArr = JSON.parse(xhttp.responseText)
    let sum = 0;
    responseArr['item'].forEach(element => {
      sum += element['bestPrice']
      let html = `
      <li class="produtos-descricao">
        <div class="produto-imagem"><img src="${element['image']}"/></div>
        <div title="${element['name']}" class="produto-nome">${element['name']}</div>
        <div class="produto-qnt-valor">
          <span>Qtd.: ${element['quantity']}</span>
          <span>${element['bestPriceFormated']}</span>
        </div>
    </li>
      `
      document.querySelector(`.produtos-shop`).insertAdjacentHTML('beforeend', html)
    });
    let cents = sum.toString().split("").slice(-2).join("")
    sum = sum.toString()
    sum = sum.substring(0, sum.length - 2)
    sum = sum +","+cents
    
    document.querySelector(`.valor-total`).innerHTML = `R$ ${sum}`
  }
}

