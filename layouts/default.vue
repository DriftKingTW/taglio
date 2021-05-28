<template>
  <div>
    <Nuxt />
  </div>
</template>

<style type="scss">
@import url('@/assets/css/vue-tooltip.css');

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/**
 * This injects Tailwind's base styles and any base styles registered by
 * plugins.
 */
@tailwind base;

/**
 * This injects Tailwind's component classes and any component classes
 * registered by plugins.
 */
@tailwind components;

/**
 * This injects Tailwind's utility classes and any utility classes registered
 * by plugins.
 */
@tailwind utilities;

/**
 * Use this directive to control where Tailwind injects the responsive
 * variations of each utility.
 *
 * If omitted, Tailwind will append these classes to the very end of
 * your stylesheet by default.
 */
@tailwind screens;
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
