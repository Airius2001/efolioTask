<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">User Information</h1>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-bind="usernameAttrs"
                  v-model="username"
                />
                <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
              </div>
              <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-bind="passwordAttrs"
                  v-model="password"
                />
                <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isAustralian"
                    v-model="formData.isAustralian"
                  />
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
              <div class="col-md-6">
                <label for="gender" class="form-label">Gender</label>
                <select
                  class="form-select"
                  id="gender"
                  v-bind="genderAttrs"
                  v-model="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="genderError" class="text-danger">{{ genderError }}</div>
              </div>
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-bind="reasonAttrs"
                v-model="reason"
              ></textarea>
              <div v-if="reasonError" class="text-danger">{{ reasonError }}</div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row mt-5" v-if="submittedCards.length">
        <h2 class="text-center mb-4">Submitted User Information</h2>
        <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
function createValidator(initialValue, validate) {
    const value = ref(initialValue);
    const error = ref(undefined);

    const validateField = () => {
        const validationResult = validate(value.value);
        error.value = validationResult === true ? undefined : validationResult;
    };

    const attrs = {
        onInput: () => {
            validateField();
        },
        onBlur: () => {
            validateField();
        }
    };

    return [value, error, attrs];
}


  
const [username, usernameError, usernameAttrs] = createValidator(
    '',
    (value) => value.length < 3 ? 'Name must be at least 3 characters' : true
);

const [password, passwordError, passwordAttrs] = createValidator(
    '',
    (value) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (value.length < minLength) return 'Password must be at least 8 characters long.';
        if (!hasUppercase) return 'Password must contain at least one uppercase letter.';
        if (!hasLowercase) return 'Password must contain at least one lowercase letter.';
        if (!hasNumber) return 'Password must contain at least one number.';
        if (!hasSpecialChar) return 'Password must contain at least one special character.';
        return true;
    }
);

const [gender, genderError, genderAttrs] = createValidator(
    '',
    (value) => value === '' ? 'Please select your gender option.' : true
);

const [reason, reasonError, reasonAttrs] = createValidator(
    '',
    (value) => value === '' ? 'Please fill in the reason for joining.' : true
);

const formData = ref({
    isAustralian: false
});

const submittedCards = ref([]);

const submitForm = () => {
    if (!usernameError.value && !passwordError.value && !genderError.value && !reasonError.value) {
        submittedCards.value.push({
            username: username.value,
            password: password.value,
            isAustralian: formData.value.isAustralian,
            gender: gender.value,
            reason: reason.value
        });
        clearForm();
    }
};

const clearForm = () => {
    username.value = '';
    password.value = '';
    gender.value = '';
    reason.value = '';
    formData.value.isAustralian = false;
};
</script>

<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>
  