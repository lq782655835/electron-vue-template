<template>
    <u-flex-layout direction="vertical" justify="center" alignment="center" class="login">
        <u-header :showTooltips="false" class="header"/>
        <u-flex-layout direction="vertical" justify="center" alignment="center" class="login-container">
                <l-login-input
                    color="black"
                    label="主机地址"
                    :value="inputAddress"
                    v-model="inputAddress"
                    style="marginTop:50px;"
                    :message="addressMessage"
                    hint="normal"
                    @focus="showAddressHint(true)"
                    @blur="showAddressHint(false)"
                />
                <l-login-input
                    color="black"
                    label="验证码"
                    type="password"
                    :value="inputCheckcode"
                    v-model="inputCheckcode"
                    style="marginTop:33px;"
                    :message="loginErrorMessage"
                    @keyup.enter="loginClick"
                    hint="error"
                />
                <u-button 
                    color="primary"
                    class="login-button"
                    @click="loginClick"
                    :disabled="!isAccoutValue">
                    {{loginButtonText}}
                </u-button>
        </u-flex-layout>
    </u-flex-layout>
</template>

<script>
import UHeader from '@/components/u-header'
import LLoginInput from '@/components/login/l-login-input'
import { login } from '@/server/api'
import { tokenLoc } from '@/utils/locs'
import { IPC_RENDERER_SIGNAL } from '@/utils/config'

export default {
    components: {
        UHeader,
        LLoginInput
    },
    data: () => ({
        inputAddress: '',
        inputCheckcode: '',
        addressMessage: '',
        loginErrorMessage: '',
        loginButtonText: '连接',
        loginButtonClass: 'login-button'
    }),
    computed: {
        isAccoutValue() {
            return this.inputAddress && this.inputCheckcode
        }
    },
    created() {
        tokenLoc.clear()
        this.$electron.ipcRenderer.send(IPC_RENDERER_SIGNAL.SET_LOGIN_SIZE)
    },
    methods: {
        /* 登录 */
        async loginClick() {
            if (!this.isAccoutValue) return

            this.loginButtonText = '登录中...'
            await login({ verificationCode: this.inputCheckcode })
                .then(res => {
                    tokenLoc.set(res.token)
                    this.loginButtonText = '登录成功'
                    this.$router.push('/main')
                })
                .catch(res => {
                    this.loginButtonText = '登录'
                    this.loginErrorMessage = '主机地址或验证码不正确'
                })
        },

        showAddressHint(bool) {
            this.addressMessage = bool ? '格式示例：192.168.0.1:8888' : ''
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    position: relative;
    height: 100%;
    background-color: #ffffff;
    .header {
        position: absolute;
        top: 0;

        /deep/ .title {
            color: #536683;
        }
    }
    .login-container {
        flex-wrap: nowrap;
        width: 240px;

        .title {
            width: 100%;
            margin: 0;
            @include font-normal(29px, $white);
            font-weight: bold;
        }

        .login-button {
            margin-top: 50px;
            width: 100%;
            height: 40px;
        }
    }
}
</style>
