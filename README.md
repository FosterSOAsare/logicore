# Logicore - Global Logistics & Tracking Solution

Logicore is a modern, full-stack logistics platform designed to streamline shipment management and provide real-time tracking capabilities for customers. Built with performance and user experience in mind, it offers a seamless interface for both administrators and end-users.

## 🚀 Features

- **Real-Time Tracking:** Customers can track their shipments with precision, viewing detailed timelines, current status, and a dynamic route visualization.
- **Admin Dashboard:** A comprehensive admin interface for creating, updating, and managing packages.
- **Dynamic Route Visualization:** Visual representation of shipment routes with segmented progress lines and status-specific indicators.
- **Responsive Design:** Fully responsive UI that adapts perfectly to mobile, tablet, and desktop screens.
- **Status Management:** Granular control over package statuses (e.g., In Transit, Customs Hold, Delivered) with automated visual feedback.
- **Secure & Scalable:** Built on a robust tech stack ensuring security and scalability.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- MongoDB instance (local or cloud)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/logicore.git
    cd logicore
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add your MongoDB connection string and other necessary variables.

    ```env
    MONGODB_URI=your_mongodb_connection_string
    # Add other variables as needed
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/features`: Feature-based architecture containing UI components, actions, and logic for specific domains (e.g., `packages`, `tracking`, `homepage`).
- `/lib`: Shared utilities, database connections, and models.
- `/public`: Static assets.

## 🎨 Design System

Logicore uses a custom design system built on top of Tailwind CSS, featuring:

- **Primary Color:** Navy Blue (`#0f172a`)
- **Secondary Color:** Sky Blue (`#0ea5e9`)
- **Typography:** Modern sans-serif fonts for high readability.

## 📄 License

This project is licensed under the MIT License.
