//metodos iniciales//

//Metodo abrir hamburguesa//

const open = () => {
  document
    .querySelector('#section_burguer')
    .classList.toggle('menu_hamburguesa')
  if (document.getElementsByClassName('menu_hamburguesa').length > 0) {
    document.querySelector('#btn_close').classList.toggle('btn_close')
  } else {
    document.getElementById('btn_close').style.display = 'none'
  }
}

const close = () => {
  btn_close.classList.toggle('menu_hamburguesa')
}

let btn = document.getElementById('btn_menu')
let main_card = document.getElementById('section_main')
let btn_close = document.querySelector('.btn_close')

if (btn) {
  btn.addEventListener('click', open)
}
if (btn_close) {
  btn_close.addEventListener('click', close)
}
