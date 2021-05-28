<template>
  <div
    class="w-screen mx-auto left-0 right-0 top-0 bottom-0 absolute"
    @dragover="dragover"
    @drop="drop"
  >
    <div v-if="showOverlay" @dragleave="dragleave">
      <div ref="dragOverlay" class="drag-overlay">
        <h2 class="text-center text-white text-5xl font-bold animate-bounce">
          Drop it!
        </h2>
      </div>
    </div>

    <div class="actions min-w-full flex justify-center items-center h-20">
      <input
        ref="imgInput"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
      />
      <input
        class="input-size"
        name="imgWidth"
        type="text"
        v-model="imgWidth"
      />
      <input
        class="input-size"
        name="imgHeight"
        type="text"
        v-model="imgHeight"
      />
      <a
        href="#"
        class="btn-normal rounded-l-md"
        role="button"
        @click.prevent="showFileChooser"
      >
        Upload
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="reset"
      >
        Reset
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="cropImage"
      >
        Crop
      </a>
      <a
        v-show="image"
        class="btn-normal rounded-r-md"
        role="button"
        :href="cropImg"
        download
      >
        Download
      </a>
    </div>
    <div
      class="actions min-w-full flex justify-center items-center absolute bottom-10 z-50 opacity-75 hover:opacity-100 transition ease-in"
    >
      <a
        v-show="image"
        href="#"
        class="btn-normal rounded-l-md"
        role="button"
        @click.prevent="zoom(0.2)"
      >
        +
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="zoom(-0.2)"
      >
        -
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(45)"
      >
        ↻ 45°
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(-45)"
      >
        ↺ 45°
      </a>
      <a
        v-show="image"
        ref="flipX"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="flipX"
      >
        Flip X
      </a>
      <a
        v-show="image"
        ref="flipY"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="flipY"
      >
        Flip Y
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(90)"
      >
        ↻ 90°
      </a>
      <a
        v-show="image"
        href="#"
        class="btn-normal rounded-r-md"
        role="button"
        @click.prevent="rotate(-90)"
      >
        ↺ 90°
      </a>
    </div>

    <div class="cropper-area mt-3">
      <vue-cropper
        v-if="image"
        class="w-screen left-0 right-0 top-20 bottom-0 absolute"
        :src="image"
        :aspectRatio="1200 / 630"
        :viewMode="2"
        :autoCropArea="1"
        :background="false"
        ref="cropper"
        preview=".preview"
      />
      <div
        v-else
        class="crop-placeholder bg-gray-100 flex items-center justify-center dark:bg-gray-800 left-0 right-0 top-20 bottom-0 absolute cursor-pointer"
        @click="showFileChooser"
      >
        <p class="text-gray-300 text-center text-3xl font-bold animate-bounce">
          Drag image or click to upload image!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
