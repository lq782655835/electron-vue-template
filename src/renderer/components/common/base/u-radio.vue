<template>
    <label class="u-radio" >
        <input type="radio" :name="name" v-model="model" :value="val" :disabled="disabled" @focus="onFocus" @blur="onBlur"/>
        <div class="radio-indicator"></div>
        <div class="radio-text">
            <slot></slot>
        </div>
    </label>
</template>

<script>
export default {
    name: 'u-radio',
    props: {
        value: { default: '' },
        disabled: { type: Boolean, default: false },
        name: { type: String, required: true },
        val: { type: [String, Number], default: true }
    },
    data() {
        return {
            radioGroupComponent: null
        }
    },
    computed: {
        model: {
            get() {
                // return this.value
                return this.isRadioGroup ? this._groupPickedValue : this.value
            },
            set(val) {
                if (this.isRadioGroup) {
                    this.radioGroupComponent.handleChange(val)
                } else {
                    this.$emit('input', val)
                }
                // this.$emit('input', val)
            }
        },
        isRadioGroup() {
            return !!this.radioGroupComponent
        },
        isDisabled() {
            return (this.isRadioGroup && this.radioGroupComponent.disabled) || this.disabled
        },

        _groupPickedValue() {
            return this.radioGroupComponent && this.radioGroupComponent.pickedValue
        }
    },
    mounted() {
        this._findRadioGroupComponent()
    },
    methods: {
        onFocus(e) {
            this.$emit('focus', e)
        },
        onBlur(e) {
            this.$emit('blur', e)
        },
        _findRadioGroupComponent() {
            let parentComponent = this.$parent
            while (parentComponent) {
                if (parentComponent.$options.name === 'u-radio-group') {
                    this.radioGroupComponent = parentComponent
                    break
                }
                parentComponent = parentComponent.$parent
            }
        }
    }
}
</script>


<style lang="scss" scoped>
$radio-border-color: #9ba5b2;
$radio-checked-color: #3690ec;
$radio-disabled-color: #e6e6e6;
.u-radio {
    display: inline-block;
    position: relative;
    padding-left: 14px;
    // margin-bottom: 10px;
    margin: 6px 0;
    cursor: pointer;
    font-size: 12px;

    & input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    & .radio-indicator {
        position: absolute;
        top: 2px;
        left: 0;
        height: 11px;
        width: 11px;
        background: $white;
        border-radius: 50%;
        border: 1px solid $radio-border-color;

        &:after {
            content: '';
            position: absolute;
            display: none;
            left: 2px;
            top: 2px;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background: $white;
        }
    }

    & input:checked ~ .radio-indicator:after {
        display: inline-block;
    }

    &:hover input ~ .radio-indicator,
    & input:focus ~ .radio-indicator {
        background: #ccc;
        // border-color: clear;
    }

    & input:checked ~ .radio-indicator {
        background: $radio-checked-color;
        border-color: clear;
    }

    & input:checked ~ .radio-text {
        font-weight: bold;
    }

    & input:disabled ~ .radio-indicator {
        background: #e6e6e6;
        opacity: 0.6;
        pointer-events: none;
    }
}

// & input:disabled ~ .control__indicator:after {
//   background: #7b7b7b;
// }
</style>
