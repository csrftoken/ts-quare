<template>
  <div class="sui-container wrapper">
    <Header />
    <Nuxt />
    <auth v-if='$store.state.isNeedLogin'></auth>
    <Footer />
  </div>
</template>
<script>

import Header from '~/components/public/Header'
import Footer from '~/components/public/Footer'
import auth from '~/components/auth'

export default {
  components: {
    Header,
    Footer,
    auth
  }
}

</script>

<style>
</style>
