<template>
  <div class="wrap">
    <div class="logo">
        <img src="/static/img/preview/logo透明.png" alt="">
    </div>
        <!-- 登录 -->
    <div class="login-wrapper" >
          <div style="cursor: pointer;" @click="goBack">
            <img src="/static/img/问卷/返回.png" alt="" style="width:0.15rem;height:0.15rem;transform: translate(-150%,60%);">
          <div style="color:#a0bae9;transform: translateY(-50%)">返回登录</div>
          </div>

        <div class="header">注册账号</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="请输入用户名" class="input-item" v-model="username">
                <div v-if="username.length > 20" class="error-name">用户名不能超过20个字符</div>
                <input type="password" name="password" placeholder="请输入密码" class="input-item" v-model="password">
                <div v-if="password.length < 6 && password.length" class="error-wd">密码不能小于6位</div>
                <div v-if="password.length >20" class="error-wd">密码不能大于20位</div>
                <div class="btn" @click="goDeng">确定</div>
            </div>
    </div>
    <img src="/static/img/问卷/注册1.png" alt="" style="width:2.7rem;height:2rem;transform:translate(0rem,-1.6rem)">
    <img src="/static/img/问卷/注册2.png" alt="" style="width:2.2rem;height:1.9rem;transform:translate(5rem,-0.6rem)">
  </div>

</template>

<script>
import $http from '@/utils/request'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goDeng () {
      this.getZhu()
    },
    goBack () {
      this.$router.push('/DengLu') // 使用保存的this引用
    },
    getZhu () {
      const that = this

      // 发送POST请求
      $http.post('/api/user/enroll', {
        name: this.username,
        password: this.password
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8' // 设置Content-Type为application/json
        }
      })
        .then(function (response) {
          // 处理成功情况
          console.log(response)
          if (response.success === true) {
            that.$message({
              message: '注册成功！',
              type: 'success'
            })
            that.$router.push('/DengLu') // 使用保存的this引用
            console.log('成功')
          } else {
            console.log(response.errorMsg)
            that.$message.error(response.errorMsg)
          }
        })
    }
  },
  mounted () {

  }

}
</script>

<style lang="less" scoped>
.wrap{
    background: url("/public/static/img/问卷/背景.png") no-repeat;
    background-size: 100% 100% ;
    .logo{
        width:100%;
        height:0.5rem;
        img{
            width:0.5rem;
            height:0.5rem;
            transform: scale(2);
            margin-left:0.2rem;
            margin-top:0.1rem;
        }
    }
    .login-wrapper {
            background-color: #fff;
            width: 2.3rem;
            height: 2.5rem;
            border-radius: 0.1rem;
            padding: 0 50px;
            transform:translate(120%,15%);
            .header {
            font-size: 0.15rem;
            font-weight: bold;
            text-align: center;
            line-height: 0.5rem;

            }

            .form-wrapper{
              .input-item {
            display: block;
            width: 100%;
            margin-bottom: 0.2rem;
            border: 0;
            padding: 0.06rem 0;
            border-bottom: 1px solid rgb(128, 125, 125);
            font-size: 0.1rem;
            outline: none;
              }
              .input-item:placeholder {
            text-transform: uppercase;
              }
              .btn {
            text-align: center;
            padding: 0.06rem 0;
            width: 100%;
            margin-top: 0.3rem;
            background-image: linear-gradient(to right, #afc6ed, #0840c0);
            color: #fff;
            cursor: pointer;
              }
              .error-name{
                transform:translate(50%,-0.35rem);
                color:red;
                font-size:0.08rem;
              }
              .error-wd{
                transform:translate(50%,-0.35rem);
                color:red;
                font-size:0.08rem;
              }
            }
            .msg {
            width:100%;
            text-align: center;
            line-height: 0.5rem;
            background-color: transparent ;
            a {
            text-decoration-line: none;
            color: #abc1ee;
            }
          }
        }

  }

</style>
