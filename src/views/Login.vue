<template>
  <div class="align-vertically">
    <b-container>
      <div class="center">
        <img src="../assets/logo.png" alt="ToDo logo" class="logo" />
      </div>
      <b-row class="row-centered">
        <b-col sm="12" lg="4" xl="4" md="6">
          <b-form @submit="formSubmit">
            <b-alert variant="danger" show v-if="loginFailedMessage">{{
              loginFailedMessage
            }}</b-alert>
            <b-form-group label="Korisničko ime" label-for="username">
              <b-form-input
                id="username"
                v-model="form.username"
                required
                placeholder="korisnik"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Lozinka" label-for="password">
              <b-form-input
                id="password"
                v-model="form.password"
                required
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Prijavi se</b-button>
            </b-form-group>
            <b-form-group>
              <b-button variant="info" :to="'/register'">Registruj se</b-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import httpService from "../services/httpService";
import * as Global from "../Global";

export default {
  name: "Login",
  data() {
    return {
      loginFailedMessage: null,
      form: {
        username: "",
        password: "",
        rememberMe: false
      },
      product: null
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();

      this.loginFailedMessage = null;

      if (!this.validateForm()) return;
      let user = {
        username: this.form.username,
        password: this.form.password
      };
      httpService
        .post(Global.apiurl + "authenticate", user)
        .then(res => {
          if (res.status === 200) {
            if (res.data.token === "") {
              this.loginFailedMessage =
                "Došlo je do greške. Molimo pokušajte kasnije";
              return;
            }

            this.$cookies.set("authtoken", res.data.token);
            this.$cookies.set("username", this.form.username);
            window.location = "/";
          }
        })
        .catch(error => {
          if (error.response.status === 401)
            this.loginFailedMessage = "Podaci za prijavu nisu ispravni";
          else
            this.loginFailedMessage =
              "Došlo je do greške. Molimo pokušajte kasnije";
        });
    },
    validateForm: function() {
      if (this.form.username === "") return false;
      if (this.form.password === "") return false;
      return true;
    }
  }
};
</script>

<style scoped></style>
