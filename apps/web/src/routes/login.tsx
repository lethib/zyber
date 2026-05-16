import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Implémentation en story 1.4</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="••••••••" disabled />
          </div>
          <Button disabled className="w-full">Se connecter</Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-foreground underline underline-offset-4">S'inscrire</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
