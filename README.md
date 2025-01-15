# Frontend For [xray-server-proxy](https://github.com/ed-asriyan/xray-server) [![CD](https://github.com/ed-asriyan/xray-server-frontend/actions/workflows/CD.yml/badge.svg)](https://github.com/ed-asriyan/xray-server-frontend/actions/workflows/CD.yml)
Installation instructions for users who has got proxy configuration

# Setup
No prerequisits except installed Docker.

## Local development
1. Install docker
2. Install dependencies:
   ```console
   make dev_install
   ```
3. Run `cp .env.example .env`
4. Open `.env` and fill it with [Supabase](https://supabase.com/) credentials.

Now you can run the dev server locally:
```console
make dev_serve
```

## Generate prod bundle
```console
make prod_build_bundle
```

## GitHub Actions
Github will automatically create release after each git tag push. Download the latest version at [https://github.com/ed-asriyan/xray-server-frontend/releases/latest/download/index.html](https://github.com/ed-asriyan/xray-server-frontend/releases/latest/download/index.html)
