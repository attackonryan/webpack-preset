import helloWebpack from './component'

import './main.css'

//导入图片
import src from './images/test.svg'
let img = new Image()
img.src = src
document.body.insertBefore(img, document.body.lastChild)



helloWebpack()