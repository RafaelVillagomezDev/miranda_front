//metodos iniciales//

//Metodo abrir hamburguesa//

let btn = document.getElementById('btn_menu')
let btn_close = document.querySelector('#section_burguer')
let hamburguesa = document.querySelector('.menu_hamburguesa')
let section_main = document.querySelector('#section_main')

const open = () => {
  hamburguesa.setAttribute('style', 'display:block')
  btn_close.setAttribute('style', 'display:block')
  section_main.classList.add('main_container')
}

const close = () => {
  if (hamburguesa) {
    hamburguesa.setAttribute('style', 'display:none')
    section_main.classList.remove('main_container')
  }
}

if (btn) {
  btn.addEventListener('click', open)
}
if (btn_close) {
  btn_close.addEventListener('click', close)
}
