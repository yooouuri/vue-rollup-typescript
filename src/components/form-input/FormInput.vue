<template>
  <input class="form-control"
         :value="localValue"
         @input="onInput"
         @change="onChange">
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'p-form-input',
  props: {
    type: String,
    name: String,
    value: {
      type: [ String, Number ],
      default: ''
    },
    placeholder: String,
    disabled: Boolean
  },
  data() {
    return {
      localValue: this.value,
    }
  },
  watch: {
    value(value) {
      this.localValue = value
    }
  },
  mounted() {
    this.localValue = this.value
  },
  methods: {
    onInput(e: any) {
      this.$emit('input', e.target.value)
    },
    onChange(e: any) {
      this.$emit('change', e.target.value)
    }
  }
})
</script>

<style scoped>

</style>
