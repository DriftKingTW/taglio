<template>
  <div
    class="actions min-w-full flex justify-center items-center absolute bottom-10 z-10 opacity-75 hover:opacity-100 transition ease-in"
  >
    <a
      v-tooltip="'Zoom In'"
      href="#"
      class="btn-normal rounded-l-md"
      role="button"
      @click.prevent="$emit('zoom', 0.2)"
    >
      <fa :icon="['fas', 'search-plus']" />
    </a>
    <a
      v-tooltip="'Zoom Out'"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('zoom', -0.2)"
    >
      <fa :icon="['fas', 'search-minus']" />
    </a>
    <a
      ref="flipX"
      v-tooltip="'Flip Horizontal'"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('flipX')"
    >
      <fa :icon="['fas', 'arrows-alt-h']" />
    </a>
    <a
      ref="flipY"
      v-tooltip="'Flip Vertical'"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('flipY')"
    >
      <fa :icon="['fas', 'arrows-alt-v']" />
    </a>
    <a
      v-tooltip="'Rotate 5°'"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('rotate', 5)"
    >
      ↻ 5°
    </a>
    <a
      v-tooltip="'Rotate -5°'"
      href="#"
      class="btn-normal rounded-r-md sm:rounded-none"
      role="button"
      @click.prevent="$emit('rotate', -5)"
    >
      ↺ 5°
    </a>
    <a
      v-tooltip="'Rotate 45°'"
      href="#"
      class="btn-normal hidden sm:block"
      role="button"
      @click.prevent="$emit('rotate', 45)"
    >
      ↻ 45°
    </a>
    <a
      v-tooltip="'Rotate -45°'"
      href="#"
      class="btn-normal rounded-r-md hidden sm:block"
      role="button"
      @click.prevent="$emit('rotate', -45)"
    >
      ↺ 45°
    </a>
  </div>
</template>

<script>
export default {
  name: 'FloatEditor'
}
</script>
