# 🧾 Fullstack Income & Expense Manager

Este proyecto es una aplicación fullstack construida con **Next.js**, **Apollo GraphQL**, **Prisma**, **PostgreSQL** y **Auth0**. Permite gestionar ingresos y egresos, usuarios y reportes financieros.

---

## 🚀 Tecnologías principales

- **Next.js** (Pages Router)
- **GraphQL** con Apollo Server & Client
- **Prisma** ORM 
- **Supabase** (base de datos)
- **Auth0** + NextAuth.js
- **Tailwind CSS** + shadcn/ui
- **Vercel** (despliegue)

---

## 📦 Requisitos

- Node.js >= 18.x
- Cuenta en [Supabase](https://supabase.com/)
- Cuenta en [Auth0](https://auth0.com/)
- Cuenta en [Vercel](https://vercel.com/)

---

## ⚙️ Configuración local

### 1. Clona el repositorio

```bash
git clone https://github.com/Eliana-Janneth/prueba-fullstack.git
cd prueba-fullstack

```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```bash
NEXTAUTH_SECRET=tu_clave_secreta
NEXTAUTH_URL=http://localhost:3000

AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_ISSUER=dev-xxxxxx.us.auth0.com
AUTH0_DOMAIN=dev-xxxxxx.us.auth0.com

AUTH0_CLIENT_ID_ADMIN=...
AUTH0_CLIENT_SECRET_ADMIN=...
AUTH0_AUDIENCE=https://dev-xxxxxx.us.auth0.com/api/v2/

DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_base

```

Puedes obtener los valores de Auth0 en tu dashboard de aplicaciones.

### 4. Genera Prisma Client y aplica las migraciones

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en: http://localhost:3000

---

## 🌐 Despliegue en Vercel

### 1. Sube tu repositorio a GitHub

```bash
git add .
git commit -m "First deploy"
git push origin main
```

### 2. Conecta tu repositorio a Vercel

1. Ve a vercel.com
2. Crea un nuevo proyecto importando tu repo
3. En Settings > Environment Variables, agrega las mismas variables de tu archivo `.env`
4. En Settings > Build & Development Settings, configura el comando de build:

```bash
npm run build
```

Y activa la opción de `Install Command`: `npm install && npx prisma generate`

### 3. Despliega la app

Vercel se encargará de hacer el deploy automático cada vez que subas cambios a main.

---

## 🛠 Mantenimiento

Para revisar el esquema de la base de datos:

```bash
npx prisma studio
```

___
## 🚀 Desarrollado por:
Eliana Puerta Morales