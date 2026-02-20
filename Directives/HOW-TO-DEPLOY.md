# How to Deploy Homeless Hand Up to Vercel

This takes about 2 minutes. You'll get a free live URL like `homeless-hand-up.vercel.app`.

---

## Option A: Deploy via GitHub (Recommended — auto-deploys on every change)

### Step 1: Push to GitHub
1. Go to https://github.com/new
2. Name the repo `homeless-hand-up` (or whatever you like)
3. Leave it as **Public** or **Private** — your choice
4. Click **Create repository**
5. Follow the instructions GitHub gives you to push your local code:

```bash
cd Homeless_Hand_Up
git init
git add .
git commit -m "Initial commit — landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/homeless-hand-up.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select `homeless-hand-up` from the list
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **Deploy**
6. Wait about 60 seconds — you'll get your live URL!

That's it. Every time you push changes to GitHub, Vercel will auto-deploy.

---

## Option B: Deploy via Vercel CLI (One-off, no GitHub needed)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```
Follow the prompts (email verification).

### Step 3: Deploy
```bash
cd Homeless_Hand_Up
vercel --prod
```
Answer the prompts (or press Enter for defaults). Done — you'll get a live URL.

---

## After Deploying

Your site will be live at something like: `https://homeless-hand-up.vercel.app`

You can change this to a custom domain later (e.g., `homelesshandup.org`) — Vercel makes this easy from their dashboard.
