<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'sight-viewer-app'
}
</script>

<style>
@import './assets/css/global.scss';
body {
    overflow: hidden;
}
#app {
    height: 100%;
    position: relative;
}
</style>
