<template>
  <div class="login">
    <LayoutHeader>
      <el-form
        slot="container"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="handleSubmit"
            :loading="isLoading"
            style="width:100%;"
          >登录</el-button>
        </el-form-item>
        <!-- 7天自动登录和忘记密码  -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button
            type="text"
            class="forget"
            @click.native.prevent="$router.push('/password')"
          >忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </LayoutHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

import LayoutHeader from "@/views/Login/LoginHeader.vue";

import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {
    LayoutHeader
  }
})
export default class LoginView extends Vue {
  @Action("setUser") setUser: any;

  @Provide() isLoading: boolean = false;

  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin: Boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true
  };

  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log("通过");
        this.isLoading = true;
        (this as any).$http
          .post("/api/users/login", this.ruleForm)
          .then(({ data }: any) => {
            this.isLoading = false;
            if (data.state === "suc") {
              localStorage.setItem("tsToken", data.token);
              this.setUser(data.token);
              this.$router.push('/');
              this.ruleForm = {
                username: "",
                pwd: "",
                autoLogin: true
              };
              // console.log(data)
              this.$message.success({
                message: data.msg,
                type: "success"
              });
            }
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped >
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>