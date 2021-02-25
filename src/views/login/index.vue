<template>
  <div class="container mx-auto">
  <!-- ... -->
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue'
export default defineComponent({
  name: 'Login',

  setup(props, ctx) {

    onMounted(() => {
      console.log(props);
    })


    return {
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
