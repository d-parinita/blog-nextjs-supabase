# Blog Website using Next.js and Supabase

## Overview

This is a fully functional blog website built with Next.js, Supabase, and Tailwind CSS. Users can read blogs, upload, edit, and delete their own blog posts. Authentication, database management, and storage functionalities are powered by Supabase.

## Technologies Used

**Frontend** - Next.js and Tailwind CSS

**Backend** - Supabase (Auth, Database, Storage)

**Database** - PostgreSQL (managed by Supabase)

**Context API** - Handles global state management efficiently.

## Features

**User Authentication** - Sign up, log in, and log out with Supabase Auth.

**Blog Management** - Create, edit, and delete blog posts, and store blog images using Supabase Storage.

**Responsive UI** - Styled with Tailwind CSS for a modern and mobile-friendly design.

## Prerequisites for Setting Up the Project

### 1. Clone the Repository:

```sh
git clone https://github.com/d-parinita/blog-nextjs-supabase.git
cd blog-nextjs-supabase 
```

### 2. Install dependencies:

```sh
npm install  # or yarn install
```

### 3. Create a .env file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
NEXT_PUBLIC_TINY_MICE_KEY=your-tiny-mice-key
```

### 4. Running the Project

Start the development server:

```sh
npm run dev  # or yarn dev
```

Open http://localhost:3000 in your browser.
