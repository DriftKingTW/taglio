<template>
  <div class="relative z-20">
    <button class="z-10 relative flex items-center focus:outline-none select-none dark:bg-gray-700 dark:text-gray-300 w-80 sm:w-40" @click="open = !open">
      <slot name="button" />
    </button>

    <!-- to close when clicked on space around it in desktop-->
    <button v-if="open" class="fixed inset-0 h-full w-full cursor-default focus:outline-none" tabindex="-1" @click="open = false" />
    <!--dropdown content: desktop-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div v-if="open" class="hidden md:block absolute shadow-lg w-40 rounded py-1 px-2 text-sm mt-4 bg-white dark:bg-gray-700 dark:text-gray-300">
        <!-- :class="placement === 'right' ? 'right-0' : 'left-0'" -->
        <slot name="content" />
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div v-if="open" class="md:hidden fixed inset-x-0 bottom-0 bg-white w-full z-20 px-2 py-2 shadow-2xl leading-loose dark:bg-gray-700 dark:text-gray-300">
        <slot name="content" />
      </div>
    </transition>
    <!-- to close when clicked on space around it in mobile-->
    <div v-if="open" class="md:hidden fixed w-full h-full inset-0 bg-gray-900 opacity-50 z-10" @click="open = false" />
  </div>
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'right',
      validator: value => ['right', 'left'].includes(value)
    }
  },
  data () {
    return {
      open: false
    }
  },
  mounted () {
    const onEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.open = false
      }
    }

    document.addEventListener('keydown', onEscape)

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', onEscape)
    })
  }
}
</script>
