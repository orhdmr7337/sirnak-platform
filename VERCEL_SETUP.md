# Vercel Multi-App Deployment Setup

Deploy Şırnak Platform monorepo as 3 separate Vercel projects for domain-isolated access.

## Architecture

- **masaj.com** → Masaj App (isolated)
- **tesisat.com** → Tesisat App (isolated)
- **admin.domain.com** → Admin App (restricted)

Each app deployed independently. Users accessing masaj.com cannot reach tesisat or admin.

## Quick Start

### 1. Get Vercel Token & Org ID

1. Token: https://vercel.com/account/tokens
2. Org ID: https://vercel.com/account/settings (visible in URL)

### 2. Add GitHub Secrets

Settings → Secrets and variables → Actions

```
VERCEL_TOKEN: <your-token>
VERCEL_ORG_ID: <your-org-id>
VERCEL_PROJECT_ID_ADMIN: <get-after-setup>
VERCEL_PROJECT_ID_MASAJ: <get-after-setup>
VERCEL_PROJECT_ID_TESISAT: <get-after-setup>
```

### 3. Link Each App to Vercel

```bash
# Admin
cd apps/admin && vercel link --yes

# Masaj
cd ../masaj && vercel link --yes

# Tesisat
cd ../tesisat && vercel link --yes
```

### 4. Add Supabase Environment Variables

For each app:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

Get values from: https://supabase.com/dashboard → Project → Settings → API

### 5. Get Project IDs

```bash
cd apps/admin && vercel project list --json | jq -r '.[0].id'
cd ../masaj && vercel project list --json | jq -r '.[0].id'
cd ../tesisat && vercel project list --json | jq -r '.[0].id'
```

Update GitHub Secrets with these IDs.

### 6. Deploy

Push to main:

```bash
git push origin main
```

GitHub Actions will deploy all 3 apps automatically.

### 7. Configure Custom Domains (Optional)

For each Vercel project:
- Settings → Domains → Add custom domain
- Update DNS settings accordingly

## Automated Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Builds each app independently
- Deploys to its Vercel project
- Maintains separate environments

Push to main triggers deployment.

## Troubleshooting

**Build fails with workspace error:**
- Ensure root has `npm ci --legacy-peer-deps` in vercel.json
- Each app inherits monorepo node_modules

**Env vars not available:**
- Add to production environment in Vercel
- Or add to all environments (preview + prod)

**Root URL returns 404:**
- Root is monorepo manager, not an app
- Access: masaj.com, tesisat.com, admin.domain.com

**Deployments not triggering:**
- Check GitHub Actions secrets are set
- Verify VERCEL_TOKEN, ORG_ID, PROJECT_IDs
- Check Actions workflow runs via GitHub

## Benefits

✅ Complete app isolation
✅ Independent deployments
✅ Domain-based access control
✅ Separate analytics & logs
✅ Easy to scale
