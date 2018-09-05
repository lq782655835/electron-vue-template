<template>
  <div :class="`status-${status}`" :style="{color: color}" class="u-progress">
    <div class="bar-track">
      <div class="indicator" :style="{width: `${tweenedPercentage}%`, backgroundColor: color}"
           :class="`status-${status}`" />
    </div>

    <ai-icon v-if="animatedPercentage === '100'" name="check_circle" class="success-indicator text" />
    <div v-else class="text">{{animatedPercentage}}%</div>
  </div>
</template>

<script>
export default {
    name: 'u-progress',
    props: {
        percentage: { type: Number, required: true },
        color: { type: String },
        status: { type: String, default: 'normal' }
    },
    data() {
        return {
            tweenedPercentage: this.percentage
        }
    },
    computed: {
        animatedPercentage() {
            return this.tweenedPercentage.toFixed(0)
        }
    }
}
</script>

<style lang="scss">
$color-alert: #f62626;
$color-warning: #fd7222;
$color-success: #0ab259;
$color-primary: $primary-color;
$font-size-xl: 20px;
$color-inactive: #f1f1f1;
$margin-s: 8px;

.u-progress {
    display: inline-block;
    width: 100%;
    height: 20px;

    &.status-normal {
        color: $color-primary;
    }
    &.status-alert {
        color: $color-alert;
    }
    &.status-warning {
        color: $color-warning;
    }
    &.status-success {
        color: $color-success;
    }

    .bar-track {
        display: inline-block;
        width: calc(100% - 50px);
        height: 6px;
        vertical-align: middle;
        background-color: $color-inactive;
        border-radius: 100px;

        .indicator {
            height: 100%;
            border-radius: 100px;

            &.status-normal {
                background-color: $color-primary;
            }
            &.status-alert {
                background-color: $color-alert;
            }
            &.status-warning {
                background-color: $color-warning;
            }
            &.status-success {
                background-color: $color-success;
            }
        }
    }

    .text {
        display: inline-block;
        width: 42px;
        margin-left: $margin-s;
        vertical-align: middle;
        line-height: 20px;

        &.success-indicator {
            font-size: $font-size-xl;
        }
    }
}
</style>
