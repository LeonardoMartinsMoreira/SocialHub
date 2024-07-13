import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import { Formik, useFormikContext } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

type ILogin = z.infer<typeof LoginSchema>

const initialValues = {
  email: '',
  password: '',
}

const LoginSchema = z.object({
  email: z.string({ required_error: 'É obrigatório inserir um email' }).email({ message: 'Email inválido' }),
  password: z.string({ message: 'É obrigatório inserir uma senha' }).min(8, 'Sua senha deve conter ao menos 8 dígitos'),
})

interface IITextInputWithFormik extends TextInputProps {
  name: string
  label: string
}

const InputWithFormik = ({ name, label, ...props }: IITextInputWithFormik) => {
  const { setFieldValue, values, errors } = useFormikContext<ILogin>()

  const onChangeText = (values: string) => {
    setFieldValue(name, values)
  }

  return (
    <View className="w-full gap-y-1 pb-2">
      <Text className="text-cyan-800 font-medium">{label}</Text>
      <TextInput
        className="border border-cyan-800 px-4 py-4 rounded"
        value={values[name]}
        onChangeText={onChangeText}
        {...props}
      />
      {errors[name] && <Text className="text-red-500">{errors[name]}</Text>}
    </View>
  )
}

export default function Index() {
  const handleSubmit = (values: ILogin) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(LoginSchema)}
    >
      {({ handleSubmit }) => {
        return (
          <View className="flex-1 justify-center items-center px-2 gap-y-4">
            <View className="w-full">
              <InputWithFormik name="Email" placeholder="Digite seu email" label="Email" />
              <InputWithFormik name="Senha" placeholder="Digite sua senha" label="Password" />
            </View>

            <TouchableOpacity
              className="bg-cyan-600 items-center justify-center w-full p-4 rounded"
              onPress={handleSubmit}
            >
              <Text className="text-white">Logar</Text>
            </TouchableOpacity>
          </View>
        )
      }}
    </Formik>
  )
}
