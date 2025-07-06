import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className={"relative h-[250px] w-full"}>
          <Image source={images.signUpCar} className={"z-0 h-[250px] w-full"} />
          <Text className={"absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black"}>
            Welcome 👋
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Email"}
            labelStyle={""}
            placeholder={"Enter your email"}
            icon={icons.email}
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            labelStyle={""}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
          <CustomButton title={"Sign up"} className={`mt-6`} onPress={onSignInPress} />
          <OAuth />
          <Link href={"/sign-up"} className={"mt-10 text-center text-lg text-general-200"}>
            <Text>Don&#39;t have an account? </Text>
            <Text className={"text-primary-500"}>Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
