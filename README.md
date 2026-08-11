# Square Up Any Debt

A modern, responsive web application for UK debt relief enquiries, built to connect individuals with FCA-authorised and regulated partners.

## Features

- **Enquiry Form**: Interactive multi-field form with full validation
- **Supabase Integration**: Automatically saves submitted enquiries to your Supabase database
- **Responsive UI**: Optimized for mobile, tablet, and desktop devices
- **UK Regulatory Notice**: Built-in compliant notices and legal terms

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router) (SSR & File-based routing)
- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Database**: [Supabase](https://supabase.com)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation & Local Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Prashun-Mishra/Debt-Website.git
   cd Debt-Website
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="<your-publishable-key>"
   SUPABASE_URL="https://<your-project-ref>.supabase.co"
   SUPABASE_PUBLISHABLE_KEY="<your-publishable-key>"
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Build for production:
   ```sh
   npm run build
   ```
