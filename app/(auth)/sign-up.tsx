import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className={"relative h-[250px] w-full"}>
          <Image source={images.signUpCar} className={"z-0 h-[250px] w-full"} />
          <Text className={"absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black"}>
            Create your account
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Name"}
            labelStyle={""}
            placeholder={"Enter your name"}
            icon={icons.person}
            value={form.name}
            onChangeText={value => setForm({ ...form, name: value })}
          />
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
          <CustomButton title={"Sign up"} className={`mt-6`} onPress={onSignupPress} />
          <OAuth />
          <Link href={"/sign-in"} className={"mt-10 text-center text-lg text-general-200"}>
            <Text>Already have an account? </Text>
            <Text className={"text-primary-500"}>Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
