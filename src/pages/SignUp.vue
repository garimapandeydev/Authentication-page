<template>
    <div>
      <h3>Signup Page</h3>
      <hr />
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <form @submit.prevent="onSignup()">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model.trim="email" />
          <div class="error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model.trim="password" />
          <div class="error" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="my-3">
          <button type="submit" class="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import SignupValidations from '../services/signupValidation';
  import { mapActions } from 'vuex';
  import { SIGNUP_ACTION } from '../store/storeconstants';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: {},
        error: null, // Added to store error messages
      };
    },
    methods: {
      ...mapActions('auth', {
        signup: SIGNUP_ACTION,
      }),
      onSignup() {
        let validations = new SignupValidations(this.email, this.password);
        this.errors = validations.checkValidations();
  
        // Reset error message before new signup attempt
        this.error = null;
  
        if ('email' in this.errors || 'password' in this.errors) {
          return false;
        }
  
        this.signup({ email: this.email, password: this.password })
          .then(() => {
            // Handle successful signup (optional)
          })
          .catch((error) => {
            console.log(error);
            this.error = error; // Set the error message to display
          });
      },
    },
  };
  </script>
  