<template>
  <div>
    <div>
      <div v-if="loginErrors" class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
    </div>
    <div>
      <!-- login form -->
      <form v-if="show" @submit.prevent="loginHandler">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            id="email"
            v-model="loginForm.email"
          />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="pass" v-model="loginForm.pass" />
        </div>
        <div class="mb-3 form-check">
          <p>
            ¿Aún no estás registrado? Registrate
            <a href="#" v-on:click="changeForm">aquí.</a>
          </p>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <!-- registration form -->
      <form v-else @submit.prevent="submitHandler">
        <div>
          <label for="email">email:</label>
          <input type="email" id="email" v-model="formState.email" />
          <span v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div>
          <label for="pass">password:</label>
          <input type="password" id="pass" v-model="formState.password.pass" />
          <span v-if="v$.password.pass.$error">
            {{ v$.password.pass.$errors[0].$message }}
          </span>
        </div>
        <div>
          <label for="confirm">repita password:</label>
          <input type="password" id="confirm" v-model="formState.password.confirm" />
          <span v-if="v$.password.confirm.$error">
            {{ v$.password.confirm.$errors[0].$message }}
          </span>
        </div>
        <div>
          <label for="code">codigo acceso:</label>
          <input type="text" id="code" v-model="formState.code" />
          <span v-if="v$.code.$error">
            {{ v$.code.$errors[0].$message }}
          </span>
        </div>

        <div>
          <p>
            ¿Ya tenés una cuenta? Ingresá
            <a href="#" v-on:click="changeForm">aquí.</a>
          </p>
        </div>

        <button>Submit!</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const emits = defineEmits(['login'])

const show = ref(true)
const loginErrors = ref()
const loginForm = reactive({
  email: '',
  pass: ''
})

const changeForm = () => {
  show.value = !show.value
}

const loginHandler = () => {
  emits('login', loginForm)
}

const formState = reactive({
  email: '',
  password: {
    pass: '',
    confirm: ''
  },
  code: ''
})

const customValidation = (value: string) => {
  return /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(value)
}

// hasta acá todo igual que siempre... ahora empieza a jugar vuelidate, con las rules :)
// guarda con esto! son COMPUTED
const rules = computed(() => {
  return {
    email: {
      required,
      email
    },
    password: {
      pass: {
        required,
        minLength: minLength(6),
        customValidation: helpers.withMessage(
          'contraseña debe tener mayúscula, minúscula y número.',
          customValidation
        )
      },
      confirm: {
        required,
        sameAs: helpers.withMessage(
          'las contraseñas deben coincidir',
          sameAs(formState.password.pass)
        )
      }
    },
    code: { required }
  }
})

// v$ es por convencion, lo propone la doc
const v$ = useVuelidate(rules, formState)

// ahora submitHandler pasa a ser SINCRONA, porque espera la validacion
const submitHandler = async () => {
  console.log('submit! ', formState)

  const result = await v$.value.$validate()
  console.log('v$: ', v$)
  console.log('result: ', result)
}
</script>
