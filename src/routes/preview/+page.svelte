<script lang="ts">
  import ResetIcon from "@src/components/ResetIcon.svelte"
  import Controls from "@src/components/Controls.svelte"
  import {process_key_stroke} from "@src/utils/utils"
  import {seconds,wrongCount,wrongIndex,wrongSequence,caretPos,interval,remaining_time,time,language,text_data,line_count,word_count,finished,chart_data} from "@src/store/store"
import axios from "axios"
import Finish from "@src/components/Finish.svelte";


  let project_name="preview" // for github project name
  let tab_width=4
  
  let characters:string = ""
  let total_line_count=0;
  let total_caretPos=0;
  let show_number_of_lines = 10;
  let writer:HTMLDivElement;
  let key=0;
  $:$remaining_time = $time> $seconds?$time - $seconds:0 

 line_count.subscribe(_=>{
  console.log($line_count)
   if($line_count==show_number_of_lines-2){   // when user gets to the end of current portion of text load another 10 line.
  total_line_count+=$line_count;
  
  $line_count =0;
  characters = $text_data.split("\n").map(x=>x.trimEnd()).slice(0+total_line_count,show_number_of_lines+total_line_count).join("\n")
  total_caretPos += $caretPos;
  $caretPos = 0;
  }
 })



 


 wrongSequence.subscribe(val=>{
  if(val==true){
    $wrongIndex = $caretPos
  }
 })

function timer(){
  $seconds++
  $seconds >1 && $chart_data.push(Math.floor($word_count*(60/$seconds))||0)

}
$:if($remaining_time==0){
  clearInterval($interval)
  $chart_data.push(Math.floor($word_count*(60/$seconds))||0)
  $finished=true
}
time.subscribe(_=>{
  reset()
})
language.subscribe(_=>{
  reset()
})
text_data.subscribe(_=>{
  reset()
})

async function reset(){
  key=Math.random()
  writer?.focus()
 total_line_count=0;
 total_caretPos=0;
 $line_count=0;
 $word_count=0
 $wrongCount = 0
 $wrongIndex = 0
 $wrongSequence = false
 $caretPos =0
 $seconds=0
 $remaining_time =$time
 $finished=false;
 $chart_data =[]
 clearInterval($interval)
 $interval =undefined;
 if($language!="upload"){

   $text_data = (await axios.get(`${project_name}/${$language}_${$time}.txt`)).data.trim()
 }
characters = $text_data.split("\n").map(x=>x.trimEnd()).slice(0+total_line_count,show_number_of_lines+total_line_count).join("\n")


}




 function keydown (e:KeyboardEvent) {
  
   e.preventDefault();
   if(!$interval){
    timer()
     $interval = setInterval(timer,1000)
   }
  if(total_caretPos+$caretPos >= $text_data.length) return
if(e.key =="Tab" && characters.slice($caretPos,$caretPos+tab_width)==" ".repeat(tab_width)){
  for (let i = 0; i < tab_width; i++) {
    process_key_stroke(e," ",e.target as HTMLDivElement,characters);
  }
}else{
  process_key_stroke(e,e.key,e.target as HTMLDivElement,characters);

}

if(total_caretPos+$caretPos >= $text_data.length) {
 
clearInterval($interval)
$finished=true
}
};

 

function pause(){
if ($seconds==0) return

  clearInterval($interval)

}

function resume(){
if ($seconds==0) return

  $interval = setInterval(timer,1000)

}

</script>
<svelte:window on:click={()=>writer?.blur()} on:keydown={(e)=>e.key=="+"&& e.shiftKey && reset() }/>
<h1 ><img src={`${project_name}/keyboard.svg`} alt="keyboard icon"> NimbleCoder</h1>
<Controls/>
{#if !$finished}
<div class="container" >
<div on:blur={()=>pause()} on:focus={()=>resume()}  on:click|stopPropagation on:keydown={keydown}  bind:this={writer} tabindex="0"   readonly class="writer" spellcheck="false">

{#key [total_line_count,key]}
{#each characters.split("") as character,index}
<span class:focus={index==$caretPos} class="chars">{character}</span>
{/each}
{/key}
</div>
<div class="tooltip"><img src={`${project_name}/cursor.png`} height=25 alt="cursor"> please click to resume</div>
<ResetIcon  on:click={()=>reset()}/> 
</div>

{:else}
<Finish {reset}/>

{/if}
<h3 class:visible={!$interval || $finished}><img width=40 src={`${project_name}/github.png`} alt="github icon"/>NimbleCoder 2022 ©</h3>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Raleway:wght@800&family=Roboto+Mono&display=swap");
  @import "@src/utils/variables.css";
  
  h1,h3{
    color:#646669;
    margin-top:10px;
    text-align: center;
    
  }
  h1{ 
    transform: translate(-100%);
    float: left;
    margin-left: 20vw;
    margin-top: 20px;
    color:var(--title-color);
  }
  h3{
    position: absolute;
    bottom: 5px;
    width: 100vw;
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    visibility: hidden;
  }
  .container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    color: var(--primary-text-color);
  
  }

 
   .writer:focus{
    filter: blur(0px);
  }
  .writer:not(:focus){
    transition-delay:0.5s;
    transition-property: filter;
    filter: blur(3px);
  }
  .tooltip{
    z-index: 10;
    opacity: 0;
    font-size: 30px;
    position:absolute;
    top:40vh;
    color:white;
    pointer-events: none;
    
  }
  .writer:not(:focus) + .tooltip{
    transition-delay:0.5s;
    opacity: 1;
  }
   .writer:focus  .focus::before{
    position: absolute;
   background: var(--caret-color);
    content: "";
    width: 2px;
    height: 40px;
    font-size: 30px;
    display: inline-block;
    overflow: visible;
    animation: blinking .5s .7s alternate infinite ease-in-out;
}
   
.writer span{
  padding:0.5px;
}
  
   
   @keyframes blinking{
    from {opacity: 1;}
  
    100% {opacity: 0;}
   }
    .writer{
      font-size: 25px;
      z-index: 1;
        min-width: 25px;
    
        border: none;
        outline: none;
        white-space: pre-wrap;
        caret-color: transparent;
    }
</style>