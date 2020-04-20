import './main.css'

//导入图片
import src from './images/test.svg'
let img = new Image()
img.src = src
document.body.insertBefore(img, document.body.lastChild)
//code split
document.body.addEventListener("click",function(){
  import('./component').then(res => {
    document.title = res.default
  }).catch(err => console.error(err))
})
