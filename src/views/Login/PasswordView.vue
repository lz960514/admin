<template>
  <div class="password">
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
          <h3>找回密码</h3>
        </div>

        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>

        <!-- email -->
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱">
            <i slot="prefix" class="fa fa-envelope-o"></i>
          </el-input>
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="handleSubmit"
            :loading="loading"
            style="width:100%;"
          >确定</el-button>
        </el-form-item>
      </el-form>
    </LayoutHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

import LayoutHeader from "./LoginHeader.vue";

@Component({
  components: {
    LayoutHeader
  }
})
export default class PasswordView extends Vue {
  @Provide() loading: boolean = false;

  @Provide() ruleForm: {
    username: string;
    email: string;
  } = {
    username: "",
    email: ""
  };

  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱", trigger: "change" }
    ]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log('通过')
        this.loading = true;
        (this as any).$http
          .post("/api/users/findPwd", this.ruleForm)
          .then(({ data }: any) => {
            this.loading = false;
            // console.log();
            if (data.state === "suc") {
              this.ruleForm = {
                username: "",
                email: ""
              };
              this.$message.success({
                message: data.msg,
                type: "success"
              });
              this.$router.push("/login");
            }
          })
          .catch(() => {
            this.loading = false;
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
</style>