import { BrandMark } from "@/components/brand-mark"

export default function Page() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="mx-auto flex h-screen flex-col items-center justify-center md:max-w-3xl">
        <BrandMark className="h-32 w-auto" />
      </div>
    </div>
  )
}
