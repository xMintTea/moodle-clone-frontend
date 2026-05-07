import Card from '#/components/Card'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useLoginMutation } from '#/features/auth/queries/useLoginMutation'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const loginMutation = useLoginMutation()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value)
    },
  })

  return (
    <div className="flex bg-blue-500 h-full items-center justify-center">
      <Card className="h-142 w-121 flex flex-col justify-center items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-2"
        >
          <form.Field name="username">
            {(field) => (
              <input
                className="p-2 border-2 w-72 border-stone-500"
                placeholder="Логин"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <input
                className="p-2 border-2 w-72 border-stone-500"
                placeholder="Пароль"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="border-2 w-72 p-2 cursor-pointer hover:bg-black/10 transition-colors duration-42 disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Вход...' : 'Войти'}
          </button>

          {loginMutation.isError && (
            <p className="text-red-700 text-sm">
              {loginMutation.error?.message || 'Ошибка авторизации'}
            </p>
          )}
        </form>
      </Card>
    </div>
  )
}