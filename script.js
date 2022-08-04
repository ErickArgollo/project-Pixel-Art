const color = document.querySelectorAll('.color');
const pixelBoard = document.querySelector('#pixel-board');
const pixel = document.getElementsByClassName('pixel');
const buttonClear = document.getElementById('clear-board');
const boardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');

const cor1 = document.getElementById('cor1');
const cor2 = document.getElementById('cor2');
const cor3 = document.getElementById('cor3');
const cor4 = document.getElementById('cor4');
buttonClear.innerText = 'Limpar';
generateBoard.innerText = 'VQV';

function randomColor() {
  let r = Math.random() * (255 - 1) + 1;
  r = Math.floor(r);
  let g = Math.random() * (255 - 1) + 1;
  g = Math.round(g);
  let b = Math.random() * (255 - 1) + 1;
  b = Math.round(b);

  return `rgb(${r}, ${g}, ${b})`;
}

function backGroundChange() {
  cor1.style.backgroundColor = 'black';
  cor2.style.backgroundColor = randomColor();
  cor3.style.backgroundColor = randomColor();
  cor4.style.backgroundColor = randomColor();

  document.body.style.backgroundImage = `linear-gradient(45deg, ${cor2.style.backgroundColor}, ${cor3.style.backgroundColor}, ${cor4.style.backgroundColor} )`;
}

backGroundChange();

function criaDivPixel() {
  const div = document.createElement('div');
  div.className = 'pixel';
  pixelBoard.appendChild(div);
}

function adicionaDivPixel(quantidade) {
  pixelBoard.innerHTML = ''; // Vazio para ajudar no requisito 10, já que toda vez que for clicado precisa substituir oq já tinha.
  for (let i = 0; i < quantidade; i += 1) {
    for (let j = 0; j < quantidade; j += 1) {
      criaDivPixel();
    }
  }
}
adicionaDivPixel(5); // 5 pois inicialmente terá essa configuração (requisito 4) até que o usuário altere no input

function select(event) {
  // Se alguma tiver a class selected, será removida, em sequência, a classe selected será adicionada ao target.
  for (let i = 0; i < color.length; i += 1) {
    color[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function addClasse() {
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener('click', select);
  }
}

addClasse();

// Chama a função color que foi adicionada as divs no click
function addColor(event) {
  const x = event.target;
  const classSelected = document.getElementsByClassName('color selected')[0];
  if (event.target.className === 'pixel') {
    if (event.target.style.backgroundColor === classSelected.style.backgroundColor) {
      x.style.backgroundColor = 'white';
    } else {
      x.style.backgroundColor = classSelected.style.backgroundColor;
    }
  }
}
// Adiciona o eventlistener ao pai das divs pixel
function addEventPixel() {
  pixelBoard.addEventListener('click', addColor);
}

addEventPixel();

// Requisito 9

buttonClear.addEventListener('click', () => {
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
});

// Requisito 10
// A configuração de grid permite que as divs (pixel) não ultrapassem a linha e forme um quadrado (for dentro de for dentro do requisito 4)

// O input será limpo a cada modificação (defini isso no requisito 4)

function boardSizeInput() {
  const valor = boardSize.value;
  if (valor.length === 0) {
    alert('Board inválido!');
  } else {
    adicionaDivPixel(valor);
    pixelBoard.style.gridTemplateColumns = `repeat(${valor}, 42px)`;
  }
}

// Requisito 11

function minMaxInput() {
  const valor = boardSize.value;
  const valorNumber = Number(valor);
  if (valorNumber < 5) {
    adicionaDivPixel(5);
    pixelBoard.style.gridTemplateColumns = 'repeat(5, 42px)';
  } else if (valorNumber > 50) {
    adicionaDivPixel(50);
    pixelBoard.style.gridTemplateColumns = 'repeat(50, 42px)';
  }
}

generateBoard.addEventListener('click', boardSizeInput);

generateBoard.addEventListener('click', minMaxInput);
