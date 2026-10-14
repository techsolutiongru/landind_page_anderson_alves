# Landing Page Pessoal Anderson Alves + TechSolution TechLab

Landing page pessoal e profissional integrada ao ecossistema **TechSolution TechLab — TI, IA & Projetos**.

---

## 🚀 Arquitetura & O que foi Implementado

1. **Trajetória e História Fiel:**
   - Inclusão dos marcos de liderança em Marketing Multinível (**Evomel**, nível Diamante: Jacareí, Colatina/ES, Guarulhos, 2015–2018).
   - Inclusão do projeto comercial **Horas Essenciais / Terra** (nível Executivo, 2018).
   - Consolidação da experiência de Saúde Pública e Tecnologia (UBSs, UPA Cumbica, Hospital Pimentas-Bonsucesso e SAMU) sem fragmentar vínculos.
   - Adição do módulo de estudos contínuos em Inteligência Artificial e Engenharia de Prompts.

2. **Galeria Fotográfica da Trajetória (`TrajectoryGallery`):**
   - Catálogo estruturado em `data/gallery.ts` utilizando as 24 fotografias originais da pasta `fotos_site_landingpage/`.
   - Organizadas por categorias com filtros rápidos (Evomel, Terra, Secretaria de Saúde).
   - Modal/Lightbox com navegação avançada (próxima/anterior), exibição de legendas contextuais, conformidade com a LGPD e privacidade de dados de saúde.

3. **TechLab 3D — Desafio da Solução (Experiência Interativa Gamificada):**
   - **Missão 01: Monte uma rede funcional.**
   - Rack e bancada isométricos virtuais permitindo selecionar e posicionar Internet Fibra (WAN), Roteador (Borda), Switch Gigabit (LAN), Terminais e Servidor Local SISS.
   - Validação de regras lógicas reais de rede no código frontend com pontuação dinâmica (100 a 150 pts), dicas educativas em caso de erro e feedback visual.

4. **Comunidade TechSolution TechLab:**
   - Seção dedicada com slogan: *"Compartilhar conhecimento. Criar soluções. Evoluir juntos."*
   - Pilares de atuação (IA & Prompts, Infraestrutura Real, Networking de Projetos).
   - Botão configurável para acesso ao grupo oficial do WhatsApp.

5. **Central de Conteúdo (TechLab Content):**
   - Calendário editorial de 30 dias pré-formatado para distribuição rápida.
   - Cópia com um clique com formatação pronta para canais e grupos de WhatsApp.
   - Custo zero de API e dependência externa.

6. **Laboratório de IA:**
   - 97 comandos organizados em 8 categorias, 10 casos guiados pré-configurados, cópia em tempo real e persistência local.

---

## 🛠️ Como Executar Localmente

```powershell
cd "landing-page-anderson-alves-final"

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 🧪 Verificação e Build de Produção

```powershell
# Checagem estrita de tipos TypeScript
npx tsc --noEmit

# Build de produção do Next.js
npm run build
```

---

## 🌐 Publicação na Vercel

1. Envie o projeto para o seu repositório Git.
2. Na Vercel, importe o projeto e selecione o framework **Next.js**.
3. Adicione a variável de ambiente:
   - `NEXT_PUBLIC_SITE_URL`: `https://seu-dominio.com.br`
4. Clique em **Deploy**.
