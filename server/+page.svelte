<script>
    //@ts-nocheck

import Toolbar from "./Toolbar.svelte";
import { API_URL,toast,Icons,browser } from '$lib/util';
import {db} from "$lib/db";
import Summary from "./Summary.svelte";
import Canvas from "./Canvas.svelte";
import DashboardClass from "./DashboardClass";
let selectedTcode = 'fbise9math';
let show =0;
let dashboardClass = null;
$: {
    selectedTcode;
    if (browser) {
       let questions = JSON.parse(localStorage.getItem(selectedTcode + "_questions"));
       let downloadTime = localStorage.getItem(`${selectedTcode}_download_time`);    
                if(!questions || !downloadTime){
                  throw new Error("no data found");
                }else {
      dashboardClass = new DashboardClass(selectedTcode,questions,downloadTime);
                }
    }
}
async function download(){
    try{
   debugger;
      const resp = await db.tcode.get(`limit=5000`)
  
  /////////////////////    
      if (resp){
        const questions = await resp.json();
        localStorage.setItem(`database`, JSON.stringify(questions));
        const currentTimestamp = new Date().getTime();
        localStorage.setItem(`database_download_time`, currentTimestamp.toString());

        toast.push('download completed');
        // console.log("questions" , questions);
      }else {
       const data = await resp.json();
        toast.push(data.message);
      }
  
    } catch (e) {
         toast.push('System error');
    }      
}

  
</script>
{#if dashboardClass}
<div class="w-full min-h-screen   bg-gray-800 text-white text-lg">
<Toolbar {download} bind:selectedTcode={selectedTcode} bind:show={show}/>
<h1 class="w-full p-2 text-xl text-center">{selectedTcode}</h1>

{#if show ==0}
<Summary {dashboardClass}/>
{/if}

{#if show ==1}
<Canvas {dashboardClass}/>
{/if}




</div>
{/if}