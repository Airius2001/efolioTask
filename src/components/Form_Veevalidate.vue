<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information</h1>
                <Form @submit="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <Field
                                name="username"
                                type="text"
                                id="username"
                                class="form-control"
                                v-model="formData.username"
                                :class="{ 'is-invalid': errors.username }"
                            />
                            <ErrorMessage name="username" class="text-danger" />
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                class="form-control"
                                v-model="formData.password"
                                :class="{ 'is-invalid': errors.password }"
                            />
                            <ErrorMessage name="password" class="text-danger" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <Field
                                    name="isAustralian"
                                    type="checkbox"
                                    id="isAustralian"
                                    class="form-check-input"
                                    v-model="formData.isAustralian"
                                />
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <Field
                                name="gender"
                                as="select"
                                id="gender"
                                class="form-select"
                                v-model="formData.gender"
                                :class="{ 'is-invalid': errors.gender }"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" class="text-danger" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <Field
                            name="reason"
                            as="textarea"
                            id="reason"
                            rows="3"
                            class="form-control"
                            v-model="formData.reason"
                            :class="{ 'is-invalid': errors.reason }"
                        />
                        <ErrorMessage name="reason" class="text-danger" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <div class="container mt-5">
        <div class="row mt-5" v-if="submittedCards.length">
            <h2 class="text-center mb-4">Submitted User Information</h2>
            <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
                <Column field="username" header="Username" />
                <Column field="password" header="Password" />
                <Column field="isAustralian" header="Australian Resident" />
                <Column field="gender" header="Gender" />
                <Column field="reason" header="Reason" />
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const schema = yup.object({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/\d/, 'Password must contain at least one number.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
    gender: yup.string().required('Please select your gender option.'),
    reason: yup.string().required('Please fill in the reason for joining.')
});

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

const { errors, handleSubmit, resetForm } = useForm({
    validationSchema: schema
});

const submitForm = handleSubmit((values) => {
    submittedCards.value.push({ ...values, isAustralian: values.isAustralian });
    resetForm();
});

const clearForm = () => {
    resetForm();
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
