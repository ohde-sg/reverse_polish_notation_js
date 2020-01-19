
const rpn = require('./lib/reverse_polish_notation')

let calc_str = "9 + 8 - 3 * 4 + 2 * 3"  // 98+34*-23*+
let rpn_arr = rpn.gen_rpn(calc_str.split(' '))
console.log(
  "算術記法　　　　：",
  calc_str.split(' ').join('')
)
console.log(
  "逆ポーランド記法：",
  rpn_arr.reduce((a,c)=>String(a)+String(c.value),'')
)
console.log(
  "計算結果　　　　：",
  rpn.calc_rpn(rpn_arr)
)
