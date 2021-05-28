<template>
  <div
    class="actions min-w-full flex justify-center items-center absolute bottom-10 z-10 opacity-75 hover:opacity-100 transition ease-in"
  >
    <a
      href="#"
      class="btn-normal rounded-l-md"
      role="button"
      @click.prevent="$emit('zoom', 0.2)"
    >
      <fa :icon="['fas', 'search-plus']" />
    </a>
    <a
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('zoom', -0.2)"
    >
      <fa :icon="['fas', 'search-minus']" />
    </a>
    <a
      ref="flipX"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('flipX')"
    >
      <fa :icon="['fas', 'arrows-alt-h']" />
    </a>
    <a
      ref="flipY"
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('flipY')"
    >
      <fa :icon="['fas', 'arrows-alt-v']" />
    </a>
    <a
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('rotate',45)"
    >
      ↻ 45°
    </a>
    <a
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('rotate',-45)"
    >
      ↺ 45°
    </a>
    <a
      href="#"
      class="btn-normal"
      role="button"
      @click.prevent="$emit('rotate',90)"
    >
      ↻ 90°
    </a>
    <a
      href="#"
      class="btn-normal rounded-r-md"
      role="button"
      @click.prevent="$emit('rotate',-90)"
    >
      ↺ 90°
    </a>
  </div>
</template>

<script>
export default {
  name: 'FloatEditor'
}
</script>
