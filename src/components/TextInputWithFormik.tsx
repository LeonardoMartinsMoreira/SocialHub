import { useFormikContext } from 'formik'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { ILogin } from '../app'

interface IITextInputWithFormik extends TextInputProps {
  name: string
  label: string
}

export const InputWithFormik = ({ name, label, ...props }: IITextInputWithFormik) => {
  const { setFieldValue, values, errors } = useFormikContext<ILogin>()

  const onChangeText = (values: string) => {
    setFieldValue(name, values)
  }

  return (
    <View className="w-full gap-y-1 pb-2">
      <Text className="text-cyan-800 font-medium text-base">{label}</Text>
      <TextInput
        className="border border-cyan-800 px-4 py-4 rounded-md"
        value={values[name]}
        onChangeText={onChangeText}
        {...props}
      />
      {errors[name] && <Text className="text-red-500">{errors[name]}</Text>}
    </View>
  )
}
