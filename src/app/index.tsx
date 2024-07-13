import { Formik } from 'formik';
import { Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { InputWithFormik } from '../components/TextInputWithFormik';
import { useMutation } from '@tanstack/react-query';
import { apiAuth, apiKey } from '../services/api';
import { router } from 'expo-router';

const MIN_PASSWORD_LENGTH = 6;

const useAuthenticate = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: ILogin) =>
      apiAuth
        .post(`/accounts:signInWithPassword?key=${apiKey}`, {
          email: email,
          password: password,
          returnSecureToken: true,
        })
        .then(({ data }) => data),
    onSuccess: () => {
      router.push('posts');
    },
  });
};

const initialValues = {
  email: '',
  password: '',
};

export type ILogin = z.infer<typeof LoginSchema>;

const LoginSchema = z.object({
  email: z
    .string({ required_error: 'É obrigatório inserir um email' })
    .email({ message: 'Email inválido' }),
  password: z
    .string({ message: 'É obrigatório inserir uma senha' })
    .min(MIN_PASSWORD_LENGTH, 'Sua senha deve conter ao menos 6 dígitos'),
});

export default function Index() {
  const { mutate, data } = useAuthenticate();
  console.log('data: ', data);

  const handleSubmit = ({ email, password }: ILogin) => {
    mutate({ email, password });
  };

  return (
    <View className="flex-1 px-4">
      <View>
        <View className="absolute top-24">
          <Text className="font-medium text-4xl text-cyan-600">
            Olá, bem vindo de volta!
          </Text>
        </View>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(LoginSchema)}
      >
        {({ handleSubmit }) => {
          return (
            <View className="flex-1 justify-center items-center gap-y-3">
              <View className="w-full">
                <InputWithFormik
                  name="email"
                  placeholder="Digite seu email"
                  label="Email"
                />
                <InputWithFormik
                  name="password"
                  placeholder="Digite sua senha"
                  label="Password"
                />
              </View>

              <TouchableOpacity
                className="bg-cyan-600 items-center justify-center w-full p-4 rounded"
                onPress={() => handleSubmit}
              >
                <Text className="text-white font-medium text-base">Logar</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}
