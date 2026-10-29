export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-white px-4">
      <div className="loader" role="status" aria-label="Cargando contenido">
        <span className="sr-only">Cargando...</span>
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Cargando</p>
    </div>
  )
}
