import AuthLayout from '@/layouts/AuthLayout'
import AuthButton from '@/components/Auth/AuthButton'
import AuthCard from '@/components/Auth/AuthCard'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import AuthForm from '@/components/Auth/AuthForm'
import AuthFooterLink from '@/components/Auth/AuthFooterLink'

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthTitle title='LOGIN' subtitle='Welcome PingPong' />

        <AuthForm>
          <AuthInput placeholder='email' type='email' />
          <AuthInput placeholder='password' type='password' />
          <AuthButton>Start PingPong</AuthButton>
        </AuthForm>

        <AuthFooterLink text="Don't have an account?" linkText='Sign up' href='/signup' />
      </AuthCard>
    </AuthLayout>
  )
}
