#!/bin/bash

# Setup separate Vercel projects for each app

echo "🚀 Setting up separate Vercel projects for each app..."
echo ""

# Admin
echo "1️⃣ Setting up Admin app..."
cd apps/admin
vercel link --yes
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
ADMIN_PROJECT_ID=$(vercel project list --json | jq -r '.[0].id')
echo "Admin Project ID: $ADMIN_PROJECT_ID"
cd ../..

echo ""

# Masaj
echo "2️⃣ Setting up Masaj app..."
cd apps/masaj
vercel link --yes
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
MASAJ_PROJECT_ID=$(vercel project list --json | jq -r '.[0].id')
echo "Masaj Project ID: $MASAJ_PROJECT_ID"
cd ../..

echo ""

# Tesisat
echo "3️⃣ Setting up Tesisat app..."
cd apps/tesisat
vercel link --yes
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
TESISAT_PROJECT_ID=$(vercel project list --json | jq -r '.[0].id')
echo "Tesisat Project ID: $TESISAT_PROJECT_ID"
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Add these to GitHub Secrets:"
echo "VERCEL_TOKEN: (from https://vercel.com/account/tokens)"
echo "VERCEL_ORG_ID: (from https://vercel.com/account/settings)"
echo "VERCEL_PROJECT_ID_ADMIN: $ADMIN_PROJECT_ID"
echo "VERCEL_PROJECT_ID_MASAJ: $MASAJ_PROJECT_ID"
echo "VERCEL_PROJECT_ID_TESISAT: $TESISAT_PROJECT_ID"
