import React from "react";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background p-10 space-y-12">
      <section>
        <h1 className="text-4xl mb-6">Style Guide</h1>
        <p className="text-muted text-lg max-w-2xl">
          This is the design system for the logistics platform. It uses a
          "Global Velocity" theme with deep blues and electric cyan accents.
        </p>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-2xl mb-4 border-b border-white/10 pb-2">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-24 w-full bg-primary rounded-lg border border-white/10"></div>
            <p className="font-mono text-sm">Primary (Midnight Blue)</p>
            <p className="text-xs text-muted">#0a192f</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-primary-light rounded-lg border border-white/10"></div>
            <p className="font-mono text-sm">Primary Light</p>
            <p className="text-xs text-muted">#112240</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-secondary rounded-lg border border-white/10"></div>
            <p className="font-mono text-sm text-secondary">Secondary (Cyan)</p>
            <p className="text-xs text-muted">#64ffda</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-accent rounded-lg border border-white/10"></div>
            <p className="font-mono text-sm text-accent">Accent (Orange)</p>
            <p className="text-xs text-muted">#ff9f1c</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl mb-4 border-b border-white/10 pb-2">
          Typography
        </h2>
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl">
              Heading 1 - We provide full assistance in freight and warehousing.
            </h1>
            <p className="text-muted text-sm mt-1">
              text-5xl font-heading font-bold
            </p>
          </div>
          <div>
            <h2 className="text-4xl">Heading 2 - Outfit</h2>
            <p className="text-muted text-sm mt-1">
              text-4xl font-heading font-bold
            </p>
          </div>
          <div>
            <h3 className="text-3xl">Heading 3 - Outfit</h3>
            <p className="text-muted text-sm mt-1">
              text-3xl font-heading font-bold
            </p>
          </div>
          <div>
            <p className="text-base text-foreground">
              Body text is set in Outfit. It is designed for high legibility.
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-muted text-sm mt-1">text-base font-sans</p>
          </div>
          <div>
            <p className="text-sm text-muted">
              Muted text for secondary information or captions.
            </p>
            <p className="text-muted text-sm mt-1">text-sm text-muted</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="text-2xl mb-4 border-b border-white/10 pb-2">
          Components
        </h2>

        <div className="space-y-8">
          {/* Buttons */}
          <div>
            <h3 className="text-xl mb-4 text-muted">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-transparent border border-secondary text-secondary rounded hover:bg-secondary/10 transition-colors">
                Outline Button
              </button>
              <button className="px-6 py-3 bg-secondary text-primary font-bold rounded hover:bg-secondary/90 transition-colors">
                Primary Action
              </button>
              <button className="px-6 py-3 bg-accent text-white font-bold rounded hover:bg-accent/90 transition-colors">
                Call to Action
              </button>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-xl mb-4 text-muted">Cards (Glassmorphism)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl">
                <h4 className="text-xl mb-2 text-secondary">Standard Card</h4>
                <p className="text-muted">
                  This card uses the .glass utility class for a translucent
                  background and blur effect.
                </p>
              </div>
              <div className="glass p-6 rounded-xl border-l-4 border-accent">
                <h4 className="text-xl mb-2 text-white">Accent Card</h4>
                <p className="text-muted">
                  A variation with an accent border to highlight important
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
