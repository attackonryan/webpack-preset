import './main.scss'

window.addEventListener("DOMContentLoaded", function () {

  const ndBtn = document.getElementsByTagName("button")[0]
  
  ndBtn.onclick = () => {
    import("./components/addCat").then(res => {
      res.default()
    }).catch(err => console.error(err))
  }

})