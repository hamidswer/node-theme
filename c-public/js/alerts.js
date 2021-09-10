export const hideAlert = () => {
  const el = document.querySelector('.alert')
  if (el) {
    el.parentElement.removeChild(el)
  }
}
export const showAlert = (type, msg) => {
  const markup = `<div class="alert">${msg}</div>`
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
}
