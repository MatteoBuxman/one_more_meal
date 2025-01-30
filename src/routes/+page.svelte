<script>
  import { ArrowRight, Heart, Clock, MapPin, Share2, CheckCircle2 } from 'lucide-svelte';
</script>

<div class="flex flex-col min-h-screen bg-white">
  <!-- Hero Section -->
  <section class="relative overflow-hidden bg-blue-50">
    <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-grid-blue-100/[0.2]" ></div>
    <div class="absolute top-0 right-0 -mt-16 opacity-20">
      <svg width="800" height="800" viewBox="0 0 800 800" class="text-blue-500/20">
        <circle cx="400" cy="400" r="400" fill="currentColor"/>
      </svg>
    </div>
    <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-28 md:pb-40">
      <div class="flex flex-col items-center text-center space-y-8">
        <div class="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-blue-100 text-sm">
          <span class="flex items-center text-blue-600">
            <Heart class="h-4 w-4 mr-1.5" />
            Fighting Food Waste Together
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
          Connecting Food Surplus with
          <span class="text-blue-600"> Those in Need</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl">
          OneMoreMeal makes food donation simple and efficient. Join our community of donors 
          and help create a world where no food goes to waste.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button class="inline-flex items-center justify-center rounded-md text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
            Start Donating
            <ArrowRight class="ml-2 h-5 w-5" />
          </button>
          <button class="inline-flex items-center justify-center rounded-md text-lg px-8 py-3 border border-blue-200 hover:bg-blue-50">
            Find Food Near You
          </button>
        </div>
        <div class="grid grid-cols-3 gap-12 pt-12 text-slate-600">
          {#each [
            { number: "50K+", label: "Meals Shared" },
            { number: "1000+", label: "Active Donors" },
            { number: "200+", label: "Communities" }
          ] as stat}
            <div class="space-y-1">
              <div class="text-3xl font-bold text-blue-600">{stat.number}</div>
              <div class="text-sm">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Features Cards (Overlapping) -->
  <section class="relative -mt-20 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-3 gap-6">
        {#each [
          {
            icon: Clock,
            title: "Quick & Easy Process",
            description: "List or request food in minutes with our streamlined platform"
          },
          {
            icon: MapPin,
            title: "Local Community Focus",
            description: "Connect with donors and recipients in your neighborhood"
          },
          {
            icon: Share2,
            title: "Real-time Tracking",
            description: "Stay updated with live notifications and status updates"
          }
        ] as feature}
          <div class="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-all p-6">
            <div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <svelte:component this={feature.icon} class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="font-semibold text-lg mb-2">{feature.title}</h3>
            <p class="text-slate-600">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl font-bold">How OneMoreMeal Works</h2>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          A simple four-step process to connect surplus food with those who need it
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-12">
        {#each [
          {
            title: "For Food Donors",
            steps: [
              "Register your business or organization",
              "List available surplus food",
              "Get matched with local recipients",
              "Coordinate pickup or delivery"
            ]
          },
          {
            title: "For Recipients",
            steps: [
              "Create your free account",
              "Browse available food nearby",
              "Reserve what you need",
              "Pick up at scheduled time"
            ]
          }
        ] as column}
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-50/50 to-transparent rounded-lg border border-blue-100 p-8">
              <h3 class="text-xl font-semibold mb-6 text-blue-900">{column.title}</h3>
              <div class="space-y-4">
                {#each column.steps as step, i}
                  <div class="flex items-start gap-3">
                    <div class="h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                      {i + 1}
                    </div>
                    <p class="text-slate-600 pt-0.5">{step}</p>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-blue-600 text-white">
    <div class="max-w-6xl mx-auto px-6 py-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold">Ready to Make a Difference?</h2>
          <p class="text-blue-100 text-lg">
            Join our community of food donors and recipients. Together, we can reduce food waste 
            and ensure no one goes hungry.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="inline-flex items-center justify-center rounded-md text-lg px-8 py-3 bg-white text-blue-600 hover:bg-blue-50">
              Get Started
            </button>
            <button class="inline-flex items-center justify-center rounded-md text-lg px-8 py-3 border border-white text-white hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
        <div class="space-y-6">
          {#each [
            "Join 1000+ registered donors",
            "Connect with local communities",
            "Make a real impact on food waste",
            "Get tax deductions for donations"
          ] as point}
            <div class="flex items-center gap-3">
              <CheckCircle2 class="h-5 w-5 text-blue-200" />
              <span class="text-blue-50">{point}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <section class="py-12 bg-slate-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center">
        <p class="text-sm text-slate-600 mb-6">Trusted by leading organizations</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
          {#each Array(4) as _, i}
            <div class="h-8 bg-slate-300 rounded"></div>
          {/each}
        </div>
      </div>
    </div>
  </section>
</div>