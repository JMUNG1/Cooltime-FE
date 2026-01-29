export default function AuthButton({ children }: { children: React.ReactNode }) {
  return (
    <button className='cursor-pointer mt-8 w-full rounded-[10px] bg-api-blue py-3 text-white font-semibold'>
      {children}
    </button>
  )
}
