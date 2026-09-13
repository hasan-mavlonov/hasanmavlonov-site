export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-(--container-site) border-x pt-12">
      {children}
    </div>
  )
}
