import React,{useState} from 'react'
import './App.css';

function App() {
  const [clauses,setClauses]=useState(0)
  const [cnf,setCnf]=useState([])
  const [arr,setArr]=useState([])
  const [final_result,setFinal_result]=useState("")
  let array=[]
  
  let allLiterals=[]
  let allNPLiterals=[]
  let literal_frequency={}

   let literal;

   const check_for_PN=(dp2)=>{
  
    for(let i=0;i<dp2.length;i++){
      if (dp2[i].length==1){
        for(let j=0;j<dp2.length;j++){
          if (dp2[j].length==1){
          if (String(dp2[i][0])==String(-1*Number(dp2[j][0]))){
            return true
          }
        }
        }
      }
    }
    return false
  }
  const unit_clause_present =(arr,literal)=>{
    for(let i=0;i<arr.length;i++){
      if (arr[i].length==1 && arr[i][0]==String(-1*Number(literal))){
        return true
        
        
      }
    }
    return false
  }
  const unit_propogation1=(arr,literal)=>{
      for( let p=0;p<arr.length;p++){
        if(arr[p].length==1){
          for(let q=0;q<arr.length;q++){
            if (arr[q].length==1 && arr[q][0]==String(-1*Number(arr[p][0])))
            arr.push([])
            break
          }
        }
      }
      let count=0
      let new_arr=[]
        for (let i=0;i<arr.length;i++){
         
          if ((arr[i].length==1) && (arr[i][0]==String(literal))){
            count+=1
            for (let j=0;j<arr.length;j++){
              if (arr[j].includes(literal)==false ){
                if (arr[j].includes(String(-1*Number(literal)))==false){
                new_arr.push(arr[j])
               // console.log(new_arr)
                }
                
                
              }
              if ((arr[j].length==1) && (arr[j][0]==String(literal))){
                new_arr.push(arr[j])
               // console.log(new_arr)
              }
              if (arr[j].includes(String(-1*Number(literal)))){
                var value = String(-1*Number(literal))
                
                let su_ar=[]
                for (let k=0;k<arr[j].length;k++){
                  
                  if (arr[j][k]!=value){
                    su_ar.push(arr[j][k])
                  //  console.log(new_arr)
                  }
                }
                
                new_arr.push(su_ar)
              }
              
              
            }
            
          }
        }
        if (count==0){
          new_arr=arr
        }
      //console.log(new_arr)
      console.log("new array is ")
      console.log(new_arr)
      return new_arr
    }
   const pure_literal_deletion1=(arr,literal)=>{
    
      let neg_count=0
      if (Number(literal)<0){
        neg_count+=1
        return arr
      }
      else{
      
      for(let i=0;i<arr.length;i++){
       if (arr[i].includes(String(-1*Number(literal)))){
         neg_count+=1
         return arr
    
        }
    
      }
    }
    let sub_arr=[]
    if (neg_count==0){
      for(let m=0;m<arr.length;m++){
      
        if (arr[m].includes(literal)==false){
          sub_arr.push(arr[m])
    
        
      }
    }
    }
    for( let p=0;p<sub_arr.length;p++){
      if(sub_arr[p].length==1){
        for(let q=0;q<sub_arr.length;q++){
          if (sub_arr[q].length==1 && sub_arr[q][0]==String(-1*Number(sub_arr[p][0])))
          sub_arr.push([])
          break
        }
      }
    }
    return sub_arr;
    
    }
  
    const dpll_algo=(arr)=>{
    let dp1 = unit_propogation1(arr,literal)
    console.log("DP1 is ==>")
    console.log(dp1)
  
  
    let dp2=pure_literal_deletion1(dp1,literal)
     
    console.log("dp2 is ==>")
      
    console.log(dp2)
  
      let res = check_for_PN(dp2)
      console.log(`result is ${res}`)
      if (res==true){
        setFinal_result("UNSAT")
        return "false"
      }
      if (dp2.length==0){
        setFinal_result("SAT")
      return true
    }
      
    for (let i=0;i<dp2.length;i++){
      
      if (dp2[i].length==0){
        setFinal_result("UNSAT")
        return false
      }
    }
      let count =0
      for(let k=0;k<dp2.length;k++){
        
        count+=dp2[k].length
      }
      if (count==dp2.length){
        setFinal_result("SAT")
        return true
      }
    
    
   
      for(let lit=0;lit<dp2.length;lit++){
        if (dp2[lit].length>1){
          literal=dp2[lit][0]
          break
        }
      }
    console.log(`my literal is ${literal}`)
    let have_unit_clause=  unit_clause_present(dp2,literal)
      if (have_unit_clause==false){
         dp2.push([String(literal)])
         if (dpll_algo(dp2)==true){
          setFinal_result("SAT")
          return true
       }
      
        
        
      }
      else{
        
          dp2.push([String(-1*Number(literal))])
        literal=String(-1*Number(literal))
        if (dpll_algo(dp2)==true){
          setFinal_result("SAT")
          
          return true
       }
      }
      
      
    
   
     
   
  }


  const handleInputs=()=>{
  
    let subarray=[]
    array=[]
    
    
    for(let i=0;i<clauses;i++){
    const input = prompt(`please enter clause-${i+1}`)
    let cnfg=[]
    const splittedInput = input.split(" ")
    
    

    for(let j=0;j<splittedInput.length;j++){
      if(allNPLiterals.includes(splittedInput[j])){

      }
      else{
        allNPLiterals.push(splittedInput[j])
      }
      if (allLiterals.includes(Math.abs(Number(splittedInput[j])))){

      }
      else{
        allLiterals.push(Math.abs(Number(splittedInput[j])))
      }
    }
    
   
    
    array.push(splittedInput)
    //console.log("all literal are  ")
    //console.log(allLiterals)
    for (let i=0;i<array.length;i++){
      for (let j=0;j<array[i].length;j++){
          literal_frequency[array[i][j]]=0
      }
    }
    for (let i=0;i<array.length;i++){
      for (let j=0;j<array[i].length;j++){
        literal_frequency[array[i][j]]+=1
      }
    }
    //console.log(literal_frequency)
    }

    
    
    
    //dpll(cnf)
    //console.log(array)
    //console.log("all literals are ")
    //console.log(allLiterals)
    //console.log("all NP literals are ")
    //console.log(allNPLiterals)
    //pure_literal_deletion(array)
   literal = array[0][0]
   setArr(array)
     dpll_algo(array)
    //pure_literal_deletion(array)
    //one_literal(array)
   // console.log(array)
  }





  return (
    <div className="App">
      <input type="text" placeholder="Enter number of Clauses" onChange={(e)=>{
        setClauses(e.target.value)
        //console.log(clauses)

      }}/>
    
    <button onClick={()=>{
      if(clauses/1==clauses){
        handleInputs()

      }
      else{
        alert("please Enter a number")
      }

    }}>click here</button>

     {
       arr.map((item,index)=>{
         
         return(
           <div>
             <h1>{item.join('  ')}</h1>
           </div>
           
         )
       })
     }
     <h1 style={{color:"RED"}}>{final_result}</h1>
    </div>
  );
}

export default App;
