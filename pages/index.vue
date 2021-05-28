<template>
  <div
    class="w-screen mx-auto left-0 right-0 top-0 bottom-0 absolute dark:bg-gray-900"
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

    <div v-show="image" class="actions min-w-full flex justify-center items-center h-20">
      <input
        ref="imgInput"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
      >
      <input
        v-model="imgWidth"
        class="input-size rounded-l-lg"
        name="imgWidth"
        type="text"
        size="5"
        @change="setCropSize"
      >
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="setCropLock"
      >
        🔒
      </a>
      <input
        v-model="imgHeight"
        class="input-size rounded-r-lg mr-3"
        name="imgHeight"
        type="text"
        size="5"
        @change="setCropSize"
      >
      <a
        href="#"
        class="btn-normal rounded-l-md"
        role="button"
        @click.prevent="showFileChooser"
      >
        Upload
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="reset"
      >
        Reset
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="cropImage"
      >
        Crop
      </a>
      <a
        class="btn-normal rounded-r-md"
        role="button"
        :href="cropImg"
        download
      >
        Download
      </a>
    </div>
    <div
      v-show="image"
      class="actions min-w-full flex justify-center items-center absolute bottom-10 z-50 opacity-75 hover:opacity-100 transition ease-in"
    >
      <a
        href="#"
        class="btn-normal rounded-l-md"
        role="button"
        @click.prevent="zoom(0.2)"
      >
        +
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="zoom(-0.2)"
      >
        -
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(45)"
      >
        ↻ 45°
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(-45)"
      >
        ↺ 45°
      </a>
      <a
        ref="flipX"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="flipX"
      >
        Flip X
      </a>
      <a
        ref="flipY"
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="flipY"
      >
        Flip Y
      </a>
      <a
        href="#"
        class="btn-normal"
        role="button"
        @click.prevent="rotate(90)"
      >
        ↻ 90°
      </a>
      <a
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
        ref="cropper"
        class="w-screen left-0 right-0 top-20 bottom-0 absolute"
        :src="image"
        :aspect-ratio="aspectRatio"
        :view-mode="2"
        :auto-crop-area="1"
        :background="false"
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

<script>
import Vue from 'vue'

const defaultImage = ''
const WIDTH = 1200
const HEIGHT = 630

export default Vue.extend({
  data () {
    return {
      showOverlay: false,
      aspectRatio: 16 / 9,
      imgWidth: WIDTH,
      imgHeight: HEIGHT,
      image: defaultImage,
      cropImg: '',
      cropLock: true,
      data: null
    }
  },
  methods: {
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas({ width: this.imgWidth, height: this.imgHeight })
        .toDataURL()
      this.$refs.cropper.replace(this.cropImg)
    },
    flipX () {
      const dom = this.$refs.flipX
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleX(scale)
      dom.setAttribute('data-scale', scale)
    },
    flipY () {
      const dom = this.$refs.flipY
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleY(scale)
      dom.setAttribute('data-scale', scale)
    },
    reset () {
      this.$refs.cropper.replace(this.image)
      this.$refs.cropper.reset()
    },
    rotate (deg) {
      this.$refs.cropper.rotate(deg)
    },
    setImage (e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.image = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    setCropLock () {
      if (this.cropLock) {
        this.$refs.cropper.setAspectRatio(NaN)
        this.cropLock = false
      } else {
        this.$refs.cropper.setAspectRatio(this.imgWidth / this.imgHeight)
        this.cropLock = true
      }
    },
    setCropSize () {
      this.$refs.cropper.setAspectRatio(this.imgWidth / this.imgHeight)
      this.cropLock = true
    },
    showFileChooser () {
      this.$refs.imgInput.click()
    },
    zoom (percent) {
      this.$refs.cropper.relativeZoom(percent)
    },
    dragover (event) {
      event.preventDefault()
      this.showOverlay = true
    },
    dragleave () {
      this.showOverlay = false
    },
    drop (event) {
      event.preventDefault()
      if (this.image) {
        URL.revokeObjectURL(this.image)
        this.image = URL.createObjectURL(event.dataTransfer.files[0])
        this.$refs.cropper.replace(this.image)
      } else {
        this.image = URL.createObjectURL(event.dataTransfer.files[0])
      }
      event.dataTransfer.clearData()
      this.showOverlay = false
    }
  }
})
</script>

<style scoped>

.drag-overlay {
  @apply fixed
  top-0
  left-0
  right-0
  bottom-0
  h-screen
  w-full
  z-50
  overflow-hidden
  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
  flex
  flex-col
  items-center
  justify-center
  opacity-75
  animate-pulse;
}

.input-size {
  @apply appearance-none
  h-10
  text-center
  bg-gray-100
  border-none
  text-gray-700
  px-2
  object-center
  leading-tight
  focus:outline-none
  dark:bg-gray-800
  dark:text-gray-300;
}

.image-tag {
  @apply absolute
  text-lg
  -mt-10
  text-white
  px-4
  pr-6
  bg-gradient-to-r
  from-gray-700
  to-transparent
  bg-opacity-75;
}

.btn-normal {
  @apply font-medium
  cursor-pointer
  mx-0
  my-2
  py-2
  px-3
  bg-white
  text-blue-400
  border-solid
  border-0
  border-gray-400
  hover:bg-blue-400
  hover:text-white
  transition
  duration-200
  shadow
  dark:bg-gray-700
  dark:text-gray-300
  dark:hover:bg-blue-600;
}

input[type="file"] {
  display: none;
}

</style>
