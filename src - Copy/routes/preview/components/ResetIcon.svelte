<script>
    import {interval,finished} from "@src/store/store"
</script>
<div>

<svg class:hidden={!$interval && !$finished} on:click|stopPropagation version="1.0" xmlns="http://www.w3.org/2000/svg"
 width=30 height=30 viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
stroke="none">
<path d="M2360 4513 c-184 -20 -422 -83 -593 -158 -433 -190 -806 -561 -994
-988 -49 -110 -117 -307 -109 -315 6 -5 609 -172 612 -169 1 1 16 44 33 96
149 446 526 779 996 877 125 26 394 26 515 0 213 -46 424 -148 590 -286 l25
-20 -120 6 c-110 6 -124 5 -162 -14 -140 -72 -167 -276 -50 -379 20 -18 54
-37 74 -42 21 -6 256 -32 523 -57 524 -50 535 -50 602 -1 42 31 78 96 84 153
4 34 -19 210 -75 574 -45 289 -86 539 -91 555 -6 17 -24 47 -40 67 -93 112
-279 102 -360 -20 -38 -58 -44 -108 -27 -217 8 -49 13 -91 12 -93 -1 -2 -38
24 -81 56 -264 198 -575 323 -912 367 -102 14 -359 18 -452 8z"/>
<path d="M3817 2158 c-102 -326 -353 -620 -661 -775 -321 -161 -707 -187
-1036 -68 -142 52 -294 139 -410 235 l-25 20 120 -6 c110 -6 124 -5 162 14
141 72 166 277 47 381 -18 17 -51 35 -71 40 -56 16 -992 103 -1036 98 -85 -11
-162 -98 -173 -193 -4 -34 19 -210 75 -574 45 -289 86 -539 91 -555 6 -17 24
-47 40 -67 86 -104 248 -105 341 -2 54 61 65 113 47 232 -9 53 -14 98 -13 100
1 2 38 -24 81 -56 690 -516 1662 -509 2352 17 325 247 586 624 690 998 l20 72
-31 10 c-18 6 -149 42 -292 81 -143 39 -267 73 -276 76 -13 4 -22 -13 -42 -78z"/>
</g>
</svg>
    
</div>
<style>
    svg{
   
    fill: var(--reset-icon-color);
    
  
    }
    svg:active{
        transform:scale(0.9);
        
    }
    div{
        display: block;
       
        position: relative;
       text-align: center;
        z-index: 10;
        margin-bottom:auto;
        margin-top:auto
        
    }
    div:hover:after{
    
    content: "Restart Test";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: -50px;
    background: rgba(0, 0, 0, 0.696);
    color: white;
    white-space: nowrap;
    padding: 10px;
    border-radius: 10px;
    }
</style>