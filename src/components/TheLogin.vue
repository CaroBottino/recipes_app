<template>
  <div>
    <div>
      <!-- login form -->
      <form v-if="show" @submit.prevent="loginHandler">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
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
          <label for="pass" class="form-label">Password</label>
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
        <div class="mb-3">
          <label for="email" class="form-label">Nombre completo</label>
          <input type="text" class="form-control" id="fullname" v-model="formState.fullname" />
          <span v-if="v$.fullname.$error" class="error">
            {{ v$.fullname.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Avatar</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            aria-describedby="avatarHelp"
            v-model="formState.avatar"
          />
          <div id="avatarHelp" class="form-text">Url a una foto que te guste 🌸</div>
          <span v-if="v$.avatar.$error" class="error">
            {{ v$.avatar.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            id="email"
            v-model="formState.email"
          />
          <div id="emailHelp" class="form-text">Nunca compartiremos tu información.</div>
          <span v-if="v$.email.$error" class="error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-3">
          <label for="pass" class="form-label">Password</label>
          <input type="password" class="form-control" id="pass" v-model="formState.password.pass" />
          <span v-if="v$.password.pass.$error" class="error">
            {{ v$.password.pass.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-3">
          <label for="confirm" class="form-label">Password confirmación</label>
          <input
            type="password"
            class="form-control"
            id="confirm"
            v-model="formState.password.confirm"
          />
          <span v-if="v$.password.confirm.$error" class="error">
            {{ v$.password.confirm.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-3">
          <label for="code" class="form-label">Código de acceso</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="codeHelp"
            id="code"
            v-model="formState.code"
          />
          <div id="codeHelp" class="form-text">Lo enviamos a tu cuenta</div>
          <span v-if="v$.code.$error" class="error">
            {{ v$.code.$errors[0].$message }}
          </span>
        </div>

        <!-- 
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
        </div> -->

        <div>
          <p>
            ¿Ya tenés una cuenta? Ingresá
            <a href="#" v-on:click="changeForm">aquí.</a>
          </p>
        </div>

        <button class="btn btn-primary">Submit!</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { User } from '@/models/User'

const emits = defineEmits(['login', 'register'])

const show = ref(true)
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
  fullname: '',
  avatar: '',
  email: '',
  password: {
    pass: '',
    confirm: ''
  },
  code: ''
})

const customValidation = (value: string) => {
  //return /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(value)
  if (
    value.length < 8 ||
    value.length > 31 ||
    !value.match(/[A-Z]/) ||
    !value.match(/[0-9]/) ||
    !value.match(/[.,:!?]/)
  ) {
    return false
  }

  return true
}

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
          'La contraseña debe tener una cantidad mínica de 8 dígitos, máxima de 31 dígitos, al menos 1 mayúcula, al menos 1 número y al menos 1 caracter especial.',
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
    code: { required },
    fullname: { required },
    avatar: { required }
  }
})

const v$ = useVuelidate(rules, formState)

const submitHandler = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const user: User = {
      id: '',
      fullname: formState.fullname,
      avatar: formState.avatar ? formState.avatar : '',
      email: formState.email,
      pass: formState.password.pass,
      role: '',
      cart: [],
      bought: []
    }
    emits('register', user)
  }
}
</script>

<style scoped>
.error {
  color: crimson;
}
</style>
