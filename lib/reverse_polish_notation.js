
module.exports = {
  calc_rpn(rpn_arr){
    let stack = []
    rpn_arr.forEach(x => {
      if(x.is_operator){
        let right = stack.pop()
        let left = stack.pop()
        stack.push(this.ope_fnc[x.value](left, right))
      }else{
        stack.push(x.value)
      }
    })
    return stack[0]
  },
  gen_rpn(arr){
    let token_arr = arr.map(x=>this.gen_token(x))
    token_arr.push(this.zero_op)
    let out_stack = []
    let ope_stack = [this.zero_op]
    token_arr.forEach(t => {
      if(t.is_operator){
        while(ope_stack.length>0){
          let tmp_ope = ope_stack.pop()
          if(this.ope_orders[t.value] > this.ope_orders[tmp_ope.value]){
            ope_stack.push(tmp_ope)
            ope_stack.push(t)
            break
          }else{
            out_stack.push(tmp_ope)
          }
        }
      }else{
        out_stack.push(t)
      }
    })
    out_stack.pop()
    return out_stack
  },
  gen_token(c){
    if(!isNaN(c)){ // is numeric?
      return {
        value: Number(c),
        is_operator: false
      }
    }else if(String(c).match(/^[\+\-*/]$/)){ // is operator(+-*/)
      return {
        value: c,
        is_operator: true
      }
    }
    throw new Error("["+ c + "] は不正なトークンです")
  },
  ope_orders:{
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '\0': 0
  },
  ope_fnc:{
    '+': (a,b)=>a+b,
    '-': (a,b)=>a-b,
    '*': (a,b)=>a*b,
    '/': (a,b)=>a/b,
  },
  zero_op: { is_operator:true , value: '\0'}
}
