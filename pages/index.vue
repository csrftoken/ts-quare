<template>
  <div class="container">
  </div>
</template>

<script>

export default {
  layout: "default",
  head: {
    link: [
      { rel: "stylesheet", href: "/plugins/normalize-css/normalize.css" },
      { rel: "stylesheet", href: "/plugins/yui/cssgrids-min.css" },
      { rel: "stylesheet", href: "/plugins/sui/sui.min.css" },
      { rel: "stylesheet", href: "/plugins/sui/sui-append.min.css" },
      { rel: "stylesheet", href: "/plugins/font-awesome/css/font-awesome.min.css" },
      { rel: "stylesheet", href: "/css/widget-base.css" },
      { rel: "stylesheet", href: "/css/widget-head-foot.css" },
      { rel: "stylesheet", href: "/css/page-sj-headline-login.css" },
    ],
  },
}

</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
