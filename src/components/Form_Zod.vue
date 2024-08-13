<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" 
                            @blur="() => validateName(true)"
                            @input="() => validateName(false)"
                            v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" 
                            @blur="() => validatePassword(true)"
                            @input="() => validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" 
                            @blur="() => validateGender(true)"
                            @input="() => validateGender(false)"
                            v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" rows="3" 
                        @blur="() => validateReason(true)"
                        @input="() => validateReason(false)"
                        v-model="formData.reason"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
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

         <!-- <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
         </ul> -->
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { z } from 'zod';
  
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

  const formData = ref({
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: ''
  });
  
  const submittedCards = ref([]);

  const errors = ref({
    username: null,
    password: null,
    gender: null,
    reason: null,
    });


    const schema = z.object({
    username: z.string().min(3, { message: "Name must be at least 3 characters" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/\d/, { message: "Password must contain at least one number." })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character." }),
    gender: z.string().min(1, { message: "Please select your gender option." }),
    reason: z.string().min(1, { message: "Please fill in the reason for joining." })
});

const validateForm = () => {
    try {
        schema.parse(formData.value); 
        return true;
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.forEach(err => {
                const field = err.path[0];
                errors.value[field] = err.message;
            });
        }
        return false;
    }
};
  
const submitForm = () => {
    errors.value = { username: null, password: null, gender: null, reason: null };
    if (validateForm()) {
        submittedCards.value.push({ ...formData.value });
        clearForm();
    }
};

  const clearForm = () => {
    formData.value = {
        username:'',
        password:'',
        isAustralian: false,
        reason: '',
        gender: ''
    };
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