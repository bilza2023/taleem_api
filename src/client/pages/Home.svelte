<script>
    let count = 0
  </script>
  
  <main>
    <h1>Welcome to Svelte in Express!</h1>
    <button on:click={() => count++}>
      Clicked {count} times
    </button>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
    }
  </style>