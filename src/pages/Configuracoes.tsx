import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Bell, Database, Users } from "lucide-react";

const sections = [
  { icon: Users, title: 'Usuários & Permissões', desc: 'Gerencie acessos ao workspace e papéis por equipe.' },
  { icon: Bell, title: 'Alertas', desc: 'Configure limiares de alerta: falhas, timeout, baixa cobertura.' },
  { icon: Database, title: 'Retenção de Dados', desc: 'Políticas de retenção de logs, artefatos e histórico.' },
  { icon: Shield, title: 'Segurança', desc: 'Credenciais, tokens e auditoria de acesso.' },
];

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Configurações</h2>
        <p className="text-sm text-muted-foreground">Gerencie workspace, alertas, retenção e segurança</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map(s => (
          <Card key={s.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm">{s.title}</CardTitle>
                <CardDescription className="text-xs">{s.desc}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
