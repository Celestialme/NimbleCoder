<script lang="ts">
  import {process_key_stroke} from "../utils/utils"
  let tab_width=4
  let seconds=0;
  let interval: NodeJS.Timer;
  let characters = `.container{
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100vw;
    height: 100vh;
    background:#242424;
    color:white;
  }`
  let state={wrongCount:0,wrongSequence:false,caretPos:0,characters:characters.trim()}


function timer(){
  seconds++

}








 function keydown (e:KeyboardEvent) {
   e.preventDefault();
   if(!interval){
     interval = setInterval(timer,1000)
   }
  if(state.caretPos >= state.characters.length) return
if(e.key =="Tab" && state.characters.slice(state.caretPos,state.caretPos+tab_width)==" ".repeat(tab_width)){
  for (let i = 0; i < tab_width; i++) {
    process_key_stroke(" ",e.target as HTMLDivElement,state);
  }
}else{
  process_key_stroke(e.key,e.target as HTMLDivElement,state);

}
state=state
if(state.caretPos >= state.characters.length) {
  let word_count = characters.trim().split(/\s+|\n/).length;
  alert("WPM  "+word_count*(60/seconds)+"\n"+(100 - (state.wrongCount/word_count * 100)+"%"))
clearInterval(interval)
}
};

 






</script>


<div class="container">
<div  on:keydown={keydown}  contentEditable class="writer" spellcheck="false">
{#each characters.split("") as character,index}
<span class:focus={index==state.caretPos} class="chars">{character}</span>
{/each}
</div>

</div>


<style>
  :global(body){
    width: 100vw;
    height: 100vh;
    margin:0;
    padding:0;
    box-sizing:border-box
  }
  .container{
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100vw;
    height: 100vh;
    background:#242424;
    color:white;
  }
  :global(.writer .wrong){
    color:red;
    
  }
  :global(.writer .right){
    color:rgb(22, 249, 37);
    
  }
  .writer{
    z-index: 1;
  }
   .writer:focus  .focus::before{
    position: absolute;
    content:"|";
    font-size: 25px;
    display:inline-block;
    animation:blinking 0.5s alternate infinite ease-in-out
   }
   @keyframes blinking{
    from {transform:scaleY(1)}
    30% {transform:scaleY(1)}
    100% {transform:scaleY(0.0)}
   }
    .writer{
      font-size: 25px;
  
        min-width: 25px;
        height: 90%;
        border: none;
        outline: none;
        white-space: pre-wrap;
        caret-color: transparent;
    }
</style>