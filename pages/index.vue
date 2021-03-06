<template>
  <div
    class="w-screen h-screen mx-auto dark:bg-gray-900 absolute top-0 right-0 left-0 bottom-0"
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

    <div v-show="image" class="actions min-w-full flex flex-col sm:flex-row h-28 sm:h-20 justify-center items-center">
      <div class="flex flex-row items-center">
        <v-dropdown class="mr-3 mt-2 sm:mt-0">
          <!-- placement="center" -->
          <!-- Button content -->
          <template #button>
            <span v-tooltip="'Template'" class="px-2 py-2 inline-flex items-center justify-items-end text-md rounded-lg">
              <span class="mr-2">{{ currentTemplate }}</span>
            </span>
          </template>

          <!-- Opened dropdown content -->
          <template #content>
            <span v-for="(template, index) in templateList" :key="index">
              <a class="flex w-full justify-between items-center rounded-lg px-2 py-1 my-1 hover:bg-blue-600 hover:text-gray-300" href="#" @click="setCropSize(template.name, template.width, template.height)">{{ template.name }}</a>
            </span>
          </template>
        </v-dropdown>
      </div>

      <div class="flex flex-row items-center">
        <input
          ref="imgInput"
          type="file"
          name="image"
          accept="image/*"
          @change="setImage"
        >
        <input
          v-model="imgWidth"
          v-tooltip="'Width'"
          class="input-size rounded-l-lg"
          name="imgWidth"
          type="text"
          size="5"
          @change="setCropSize"
        >
        <a
          v-tooltip="'Link'"
          href="#"
          class="btn-normal"
          role="button"
          @click.prevent="setCropLock"
        >
          <fa v-if="cropLock" :icon="['fas', 'link']" />
          <fa v-else :icon="['fas', 'unlink']" />
        </a>
        <input
          v-model="imgHeight"
          v-tooltip="'Height'"
          class="input-size rounded-r-lg mr-3"
          name="imgHeight"
          type="text"
          size="5"
          @change="setCropSize"
        >
        <a
          v-tooltip="'Upload'"
          href="#"
          class="btn-normal rounded-l-md"
          role="button"
          @click.prevent="showFileChooser"
        >
          <fa :icon="['fas', 'upload']" />
        </a>
        <a
          v-tooltip="'Reset'"
          href="#"
          class="btn-normal"
          role="button"
          @click.prevent="reset"
        >
          <fa :icon="['fas', 'undo']" />
        </a>
        <a
          v-tooltip="'Crop'"
          href="#"
          class="btn-normal"
          role="button"
          @click.prevent="cropImage"
        >
          <fa :icon="['fas', 'crop']" />
        </a>
        <a
          ref="download"
          v-tooltip="'Download'"
          class="btn-normal rounded-r-md"
          role="button"
          :href="cropImg"
          :download="fileName"
          @click.prevent="downloadImage"
        >
          <fa :icon="['fas', 'download']" />
        </a>
      </div>
    </div>

    <float-editor
      v-show="image"
      ref="floatEditor"
      @zoom="zoom"
      @flipX="flipX"
      @flipY="flipY"
      @rotate="rotate"
    />

    <div class="cropper-area absoulte bottom-0 right-0 left-0 top-28 sm:top-20">
      <vue-cropper
        v-if="image"
        ref="cropper"
        class="left-0 right-0 top-28 sm:top-20 bottom-0 absolute"
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
import Vdropdown from '@/components/v-dropdown'
import FloatEditor from '@/components/float-editor'

const defaultImage = ''
const WIDTH = 1200
const HEIGHT = 630

export default Vue.extend({
  data () {
    return {
      templateList: [
        { name: 'Fanbox', width: '1200', height: '630' },
        { name: 'Pixiv', width: '4096', height: '2048' },
        { name: 'Twitter', width: '1500', height: '500' },
        { name: 'Facebook', width: '851', height: '315' },
        { name: 'Avator', width: '800', height: '800' }
      ],
      currentTemplate: 'Default',
      showOverlay: false,
      aspectRatio: WIDTH / HEIGHT,
      imgWidth: WIDTH,
      imgHeight: HEIGHT,
      image: defaultImage,
      fileName: '',
      cropImg: '',
      cropLock: true,
      data: null
    }
  },
  component: {
    Vdropdown,
    FloatEditor
  },
  methods: {
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas({ width: this.imgWidth, height: this.imgHeight })
        .toDataURL()
      this.$refs.cropper.replace(this.cropImg)
    },
    downloadImage () {
      this.cropImage()
      const link = document.createElement('a')
      link.href = this.cropImg
      link.download = this.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    flipX () {
      const dom = this.$refs.floatEditor.$refs.flipX
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleX(scale)
      dom.setAttribute('data-scale', scale)
    },
    flipY () {
      const dom = this.$refs.floatEditor.$refs.flipY
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
      this.fileName = file.name.replace(/\.[^/.]+$/, '')
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
    setCropSize (tpName, w, h) {
      if (tpName && w && h) {
        this.currentTemplate = tpName
        this.imgWidth = w
        this.imgHeight = h
      }
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
      const file = event.dataTransfer.files[0]
      if (this.image) {
        URL.revokeObjectURL(this.image)
        this.image = URL.createObjectURL(file)
        this.$refs.cropper.replace(this.image)
      } else {
        this.image = URL.createObjectURL(file)
      }
      this.fileName = file.name.replace(/\.[^/.]+$/, '')
      event.dataTransfer.clearData()
      this.showOverlay = false
    }
  }
})
</script>

<style>

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
