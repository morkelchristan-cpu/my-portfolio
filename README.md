🌌 Chris.io Portfolio Template
A high-performance, interactive portfolio built with Next.js, Framer Motion, and Tailwind CSS. Designed for developers who want to showcase their skills, social presence, and community projects with a clean, immersive "glass-morphism" aesthetic. ✨

🛠 Features Included
⌨️ Dynamic Typing Effect: Engaging hero section that cycles through your personal branding.

💻 Interactive Tech Stack: Hover-enabled icon tooltips for your developer toolset.

🎵 Glass-morphism Music Player: Integrated audio player with local track selection, play/pause functionality, and auto-skip.

🧱 Expanded About Section: A 9-block grid layout to showcase your background, mission, and current projects.

🔗 Responsive Social Links: Quick access to your Discord and GitHub profiles.

🚀 How to Set It Up
1. Project Configuration
Ensure you have the latest Next.js installed and add Framer Motion for those smooth animations:

Bash
npm install framer-motion
2. 🎧 Audio Setup
Place your .mp3 files in the /public folder (e.g., music.mp3, dakati.mp3).

Update the MUSIC_TRACKS array in page.tsx to include your file paths and track names.

3. 👤 Personalization
Update the following constants in your page.tsx file to make it yours:

PHRASES: Modify the array to update your professional taglines.

Tech Stack: Update the techStack array with your preferred icon paths and technology names.

About Blocks: Edit the grid content in the <section id="about"> block to reflect your personal journey and expertise.

4. 🌐 Custom Domain
Want to go live with your own domain?

Navigate to your project in the Vercel Dashboard.

Go to Settings > Domains.

Enter your purchased domain (e.g., chris.io) and click Add.

Update your domain registrar's DNS settings with the records provided by Vercel.

5. 📦 Deployment
Push your code to your repository, and Vercel will automatically build and deploy your site to production!

💡 Pro-Tips for Customization
✨ Glass Effect: The styling relies on backdrop-blur-md and bg-white/5 classes. Feel free to tweak the opacity in the Tailwind classes for a stronger or lighter glass look.

🎲 Randomization: The music player uses Math.random() on component mount to pick a starting track. You can add as many songs as you like to the MUSIC_TRACKS array!


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
