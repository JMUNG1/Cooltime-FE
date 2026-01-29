import AuthLayout from '@/layouts/AuthLayout'
import AuthButton from '@/components/Auth/AuthButton'
import AuthCard from '@/components/Auth/AuthCard'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import AuthForm from '@/components/Auth/AuthForm'
import AuthFooterLink from '@/components/Auth/AuthFooterLink'

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthTitle title='SIGNUP' subtitle='Create your account' />

        <AuthForm>
          <AuthInput placeholder='email' type='email' />
          <AuthInput placeholder='password' type='password' />
          <AuthInput placeholder='confirm password' type='password' />
          <AuthInput placeholder='name' type='text' />
          <AuthButton>Create account</AuthButton>
        </AuthForm>

        <AuthFooterLink text='Already have an account?' linkText='Sign in' href='/login' />
      </AuthCard>
    </AuthLayout>
  )
}
