<script>
    //@ts-nocheck

export let dashboardClass;

</script>



<div class="flex flex-col bg-gray-900 mx-10 p-4 rounded-md  justify-center">

   <div class="p-2 m-2 rounded-md bg-blue-900">
       This data is {dashboardClass.getDownloadTime()} hours old
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Number of Questions: {dashboardClass.length()}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Canvas slides: {dashboardClass.countSlideType('canvas')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Eq slides: {dashboardClass.countSlideType('Eqs')}
   </div> 


   <div class="p-2 m-2 rounded-md bg-blue-900">
    Grid slides: {dashboardClass.countSlideType('grid')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Table slides: {dashboardClass.countSlideType('TblStr')}
   </div>



</div>