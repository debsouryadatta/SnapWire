import * as React from 'react'
import { TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import Toast from 'react-native-toast-message';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [username, setUsername] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const showButtonDisabled = () => {
    Toast.show({
      type: 'info',
      text1: 'Not available yet',
      text2: 'Try out with email and password',
      visibilityTime: 3000,
      autoHide: true,
    })
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={['#111111', '#111232', '#4B6BFB']}
        className="flex-1"
      >
        <View className="flex-1 px-5">
          <StatusBar style="light" />
          
          {!pendingVerification && (
            <>
              <TouchableOpacity 
                onPress={() => router.back()} 
                className="mt-14 w-9 h-9 rounded-full bg-[#1A1A1A]/50 items-center justify-center"
              >
                <Ionicons name="chevron-back" size={20} color="#666666" />
              </TouchableOpacity>

              <View className="mt-8">
                <Text className="text-white text-[32px] font-semibold leading-10 tracking-wide">
                  Create an account
                </Text>
                <Text className="text-[#666666] text-base mt-1">
                  Sign up with
                </Text>
              </View>

              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity 
                  onPress={showButtonDisabled}
                  className="flex-1 h-[52px] rounded-xl bg-[#1A1A1A]/50 items-center justify-center flex-row border border-[#333333]"
                >
                  <View className="w-5 h-5 mr-2">
                    <View className="w-full h-full rounded-full bg-white items-center justify-center">
                      <Text className="text-[10px] font-bold text-[#DB4437]">G</Text>
                    </View>
                  </View>
                  <Text className="text-white text-[15px]">Google</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={showButtonDisabled}
                  className="flex-1 h-[52px] rounded-xl bg-[#1A1A1A]/50 items-center justify-center flex-row border border-[#333333]"
                >
                  <View className="w-5 h-5 mr-2">
                    <View className="w-full h-full rounded-full bg-[#4267B2] items-center justify-center">
                      <Text className="text-[10px] font-bold text-white">f</Text>
                    </View>
                  </View>
                  <Text className="text-white text-[15px]">Facebook</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-5 mt-8">
                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Username
                  </Text>
                  <TextInput
                    className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base"
                    placeholder="username"
                    placeholderTextColor="#666666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    style={{ fontWeight: '400' }}
                  />
                </View>

                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Email
                  </Text>
                  <TextInput
                    className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base"
                    placeholder="example@email.com"
                    placeholderTextColor="#666666"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{ fontWeight: '400' }}
                  />
                </View>

                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white pr-12 border border-[#333333] text-base"
                      placeholder="••••••••"
                      placeholderTextColor="#666666"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      style={{ fontWeight: '400' }}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5"
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={22} 
                        color="#666666" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={onSignUpPress}
                className="h-[52px] bg-[#4B6BFB] rounded-xl items-center justify-center mt-8"
              >
                <Text className="text-white font-semibold text-base">Register</Text>
              </TouchableOpacity>
            </>
          )}

          {pendingVerification && (
            <>
              <TextInput 
                value={code} 
                placeholder="Code..." 
                onChangeText={setCode}
                className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base"
                placeholderTextColor="#666666"
                style={{ fontWeight: '400' }}
              />
              <TouchableOpacity
                onPress={onPressVerify}
                className="h-[52px] bg-[#4B6BFB] rounded-xl items-center justify-center mt-4"
              >
                <Text className="text-white font-semibold text-base">Verify Email</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}