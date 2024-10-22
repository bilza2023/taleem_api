<script>
    //@ts-nocheck

export let dashboardClass;

</script>



<div class="flex flex-col bg-gray-900 mx-10 p-4 rounded-md  justify-center">

   <div class="p-2 m-2 rounded-md bg-blue-900">
    All Items: {dashboardClass.countAllCanvasItems()}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Line Items: {dashboardClass.countCanvasItems('line')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Lines Items: {dashboardClass.countCanvasItems('lines')}
   </div>

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Rect Items: {dashboardClass.countCanvasItems('rect')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Text Items: {dashboardClass.countCanvasItems('text')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Text Items: {dashboardClass.countCanvasItems('text')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Ellipse Items: {dashboardClass.countCanvasItems('ellipse')}
   </div> 
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Pie Chart Items: {dashboardClass.countCanvasItems('piechart')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    Circle Items: {dashboardClass.countCanvasItems('circle')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Bezier Items: {dashboardClass.countCanvasItems('bezier')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    angleSymbol Items: {dashboardClass.countCanvasItems('angleSymbol')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Dot Items: {dashboardClass.countCanvasItems('dot')}
   </div> 
   
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Icon Items: {dashboardClass.countCanvasItems('icon')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    polygon Items: {dashboardClass.countCanvasItems('polygon')}
   </div> 
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Triangle Items: {dashboardClass.countCanvasItems('triangle')}
   </div> 
   <div class="p-2 m-2 rounded-md bg-blue-900">
    Ray Items: {dashboardClass.countCanvasItems('ray')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    repeatDot Items: {dashboardClass.countCanvasItems('repeatDot')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    repeatText Items: {dashboardClass.countCanvasItems('repeatText')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    para Items: {dashboardClass.countCanvasItems('para')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    image Items: {dashboardClass.countCanvasItems('image')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    image2 Items: {dashboardClass.countCanvasItems('image2')}
   </div> 

   <div class="p-2 m-2 rounded-md bg-blue-900">
    sprite Items: {dashboardClass.countCanvasItems('sprite')}
   </div> 



</div>