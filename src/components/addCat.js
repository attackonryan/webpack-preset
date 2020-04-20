import imgSrc from "./../images/cat.svg"

const ndWrapper = document.getElementsByClassName('wrapper')[0]

export default () => {
  let img = new Image()
  img.src = imgSrc
  img.onload = () => {
    ndWrapper.appendChild(img)
  }
}