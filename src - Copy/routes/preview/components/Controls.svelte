
<div class="controlls">
{#if $interval && !$finished}
<div id="results" >
        <div>
            WPM  {Math.floor($word_count*(60/$seconds))||0}
        </div>
        <br>
        <div>
           ACC {(Math.floor(100 - ($wrongCount/$word_count * 100))||0)+"%"}
        </div>
</div>
{:else}
<div class="languages" >
<input  bind:group={$language} name="language" value= "javascript"  id="javascript" hidden type="radio"><label for="javascript">JavaScript</label>
<input  bind:group={$language} name="language" value= "python"      id="python"     hidden type="radio"><label for="python">Python</label>
<input  bind:group={$language} name="language" value= "c++"        id="c++"        hidden type="radio"><label for="c++">C++</label>
<input  bind:group={$language} name="language" value= "upload"        id="upload"        hidden type="radio"><label for="upload"><Upload/></label>


</div>
<div class="times" >
    <input  bind:group={$time} name="time" value= {15} id="T15" hidden type="radio"><label for="T15">15</label>
    <input  bind:group={$time} name="time" value= {30} id="T30" hidden type="radio"><label for="T30">30</label>
    <input  bind:group={$time} name="time" value= {60} id="T60" hidden type="radio"><label for="T60">60</label>
    <input  bind:group={$time} name="time" value= {Infinity} id="Tinfinity" hidden type="radio"><label on:pointerenter={()=>tooltip=true} on:pointerleave={()=>tooltip=false} id="infinity" for="Tinfinity">&infin</label>
    <div class:hidden={!tooltip} class="tooltip">
        Esc to finish
    </div>
</div>
{/if}
<div id="timer" class:hidden={$finished}>
    {$remaining_time}
</div>

</div>

<script lang="ts">
import {seconds,remaining_time,time,language,wrongCount,word_count,finished,interval} from "@src/store/store"
import Upload from "./Upload.svelte";

let tooltip=false;

</script>

<style>
  
    #results{
        margin-top:15px;
        text-align: right;
        color:var(--secondary-text-color);
    }
    .hidden{
        display:none
    }
    .tooltip{
       
        margin-bottom: -15px;
        position: absolute;
        bottom:0;
        right:0;
        pointer-events: none;
    }
    #infinity {
    font-size: 25px;
    display: block;
    transform: translate(11%,52%) scale(2);
    max-height: 13px;
    line-height: 13px;
    overflow: hidden;
    }
   
    #timer{
        font-size: 25px;
        color:var(--secondary-text-color);
        min-height: 35px;
    }
   .controlls{
    position: relative;
    padding: 15px;
    max-width: 80vw;
    left: 10vw;
    text-align: center;
   }
   .languages label:hover,.times label:hover,input:checked + label{
    color:var(--secondary-text-color);
    cursor: pointer;
   }
    .languages,.times{
        font-size: 20px;
        margin-top: 10px;
        padding-right:5px;
        color:var(--primary-text-color);
        display:flex;
        justify-content:flex-end;
        gap:10px;
        
    }
    .times{
        padding-right: 12px;
    }
</style>