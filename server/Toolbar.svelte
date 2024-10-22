<script>
    //@ts-nocheck
    import { Icons} from "$lib/util";   
    import { SmallBtnToolbar } from "sveltetools_bils/src/cmp"; 

/////////////////////////////////////////
export let show;
export let download;
export let selectedTcode;
</script>

<div class="flex  bg-gray-600 w-full text-white p-1 gap-4">
    <SmallBtnToolbar clk={download} icon={Icons.CACTUS} title="Download" />

    <select class=" bg-gray-900 rounded-md" bind:value={selectedTcode}>
        <option class=" bg-gray-900 rounded-md"  value="fbise9math">fbise9math</option>
        <option class=" bg-gray-900 rounded-md"  value="fbise10math">fbise10math</option>
        <option class=" bg-gray-900 rounded-md"  value="videoBlog">videoBlog</option>
    </select>

    <SmallBtnToolbar clk={()=>show=0} icon={Icons.BOOK} title="Summary" />
    <SmallBtnToolbar clk={()=>show=1} icon={Icons.CANVAS} title="Canvas" />
</div>
