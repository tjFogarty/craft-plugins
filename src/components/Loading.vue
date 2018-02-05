<template>
  <transition name="fade">
    <div class="loading" v-if="isLoading">
      <p>Loading plugins</p>
      <progress :value="packagesLoaded" :max="packagesCount" />
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Loading',

  computed: {
    ...mapGetters(['packagesCount']),
    ...mapState(['isLoading', 'packagesLoaded'])
  }
}
</script>


<style>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
