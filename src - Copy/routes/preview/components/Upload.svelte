<svg on:click={()=>file_input.click()} class:checked={$language=="upload"} version="1.1" id="Capa_1" width=25 height=25 fill="#646669" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 489.4 489.4;" xml:space="preserve">

	<g>
		<path d="M0,348.65v84.2c0,28.9,23.5,52.5,52.5,52.5h384.4c28.9,0,52.5-23.5,52.5-52.5v-84.2c0-28.9-23.5-52.5-52.5-52.5h-106
			c-10.8,0-19.8,8.2-20.9,19c-3.4,33.6-31.5,58.9-65.3,58.9s-61.9-25.3-65.3-58.9c-1.1-10.8-10.1-19-20.9-19h-106
			C23.6,296.15,0,319.65,0,348.65z M244.7,398.55c45.4,0,83.3-33.3,89.3-77.9h102.9c15.4,0,28,12.5,28,28v84.2c0,15.4-12.5,28-28,28
			H52.5c-15.4,0-28-12.5-28-28v-84.2c0-15.4,12.5-28,28-28h102.9C161.4,365.25,199.3,398.55,244.7,398.55z"/>
		<path d="M244.7,267.95c6.8,0,12.3-5.5,12.3-12.3V45.85l59.3,59.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6
			c4.8-4.8,4.8-12.5,0-17.3l-80.3-80.2c-4.8-4.8-12.5-4.8-17.3,0l-80.2,80.2c-4.8,4.8-4.8,12.5,0,17.3s12.5,4.8,17.3,0l59.3-59.3
			v209.8C232.5,262.45,237.9,267.95,244.7,267.95z"/>
	</g>


</svg>
<input hidden bind:this={file_input} bind:files on:change={()=>reader.readAsText(files[0])} type="file" accept=".txt">
<script lang="ts">
    import {text_data,language} from "@src/store/store"
    let file_input: HTMLInputElement
    let files: FileList
    let reader = new  FileReader();
    reader.onload = function(){
        $text_data =(reader.result as string).trim()
}
</script>
<style>
      svg:hover,.checked{
    fill:var(--secondary-text-color);
    cursor: pointer;
   }
   svg:active{
    fill:var(--secondary-text-color);
    cursor: pointer;
    transform: scale(0.9)
   }
</style>