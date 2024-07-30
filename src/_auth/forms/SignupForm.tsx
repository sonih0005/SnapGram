import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupValidation } from "@/lib/Validation";
import { z } from "zod";
import Loader from "@/components/Shared/Loader";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {checkAuthUser} = useUserContext();

  //, isLoading: isUserLoading

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } =
    useSignInAccount();
    //, isPending: isSigningIn

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);

    if (!newUser) {
      return toast({
        title: "Sign up failed, please try again or already have an account",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })
    if(!session) {
      return toast({title: 'Sign in failed, Please try again or already have an account'})
    }
    
    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn){
      form.reset();
      navigate('/')
    }else{
      return toast({title: 'sign in failed, Please try again'})
    }

    
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 italic">
          To use Snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an Account
            <Link
              to="/sign-in"
              className="text-primary-500 text-sm-semibold ml-1 italic underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
