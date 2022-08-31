<div class="chart-container">
    <div class="results">
        <p class="title">WPM</p>
        <p class="value">{Math.floor(($word_count-$wrongCount)*(60/$seconds))||0}</p>
        <p class="title">ACC</p>
        <p class="value">{(Math.floor(100 - ($wrongCount/$word_count * 100))||0)+"%"}</p>
        <p class="test-type"> test type</p>
        <p class="time-language">{$language}</p>
        <p class="time-language">time {$time!=Infinity?$time+'s':$time}</p>
    </div>
    <div  class="chart">
        <canvas use:initialization/>
        <div class="raw">
            <p >Raw</p>
            <p class="raw-value">{Math.floor($word_count*(60/$seconds))||0}</p>

        </div>
    </div>
    
</div>


<ResetIcon on:click={()=>reset()}/>
<style>
    .test-type,.raw{
        margin-top:30px;
        color: #646669;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0.25rem;
    }
    .time-language,.raw-value{
        color:var(--secondary-text-color);
    }
    .raw-value{
        font-size: 40px;
        margin-top: 15px;
        text-align:center;
    }
    .raw{
        display:inline-block;
        margin-top:10px;
        margin-left:30px;
        text-align: center;
     
    }
    .chart-container{
        height: 50vh;
        margin-top: 20vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 30px;
    }
    .results .title{
        color:var(--primary-text-color);
        font-size:20px
    }
    .results .value{
        color:var(--secondary-text-color);
        font-size:4rem;
        line-height: 4rem;
    }
    .chart{
        width:50vw;
        height:200px;
      
    }
</style>

<script lang="ts">
    export let reset:Function;
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title ,CategoryScale} from "chart.js"
    import {chart_data,wrongCount,seconds,word_count,time,language} from "@src/store/store"
    import ResetIcon from "./ResetIcon.svelte"
    function initialization(node:HTMLCanvasElement){
        Chart.register(LineController, LineElement, PointElement, LinearScale,CategoryScale, Title);
    const ctx:CanvasRenderingContext2D  =node.getContext('2d') as CanvasRenderingContext2D;
   new Chart(ctx, {
        type: 'line',
        data: {
            labels: $chart_data.map((_: any,index: number)=>index+1),
            datasets: [{
                label: '# of Votes',
                data: $chart_data,
               
                borderColor: [
                    'rgba(100, 102, 105, 1)',                    
                ],
              
                tension:0.3,
                borderWidth: 2
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            scales: {
                x: {  
                grid: {
                  
                    borderColor: '#e2b714'   // graph  bottom border color
                }
                }
              }
        }
    });
}
    </script>

 