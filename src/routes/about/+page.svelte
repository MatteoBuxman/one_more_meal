<script>
  import { Heart, Users, ArrowRight, Apple } from 'lucide-svelte';

  const impactStats = [
    {
      number: "50,000+",
      label: "Meals Delivered",
      icon: Apple
    },
    {
      number: "1,000+",
      label: "Active Volunteers",
      icon: Users
    },
    {
      number: "200+",
      label: "Partner Organizations",
      icon: Heart
    }
  ];

  const processSteps = [
    {
      title: "Collection",
      description: "We coordinate with local businesses, restaurants, and individuals to collect surplus food that would otherwise go to waste."
    },
    {
      title: "Quality Check",
      description: "Our trained volunteers ensure all collected food meets safety standards and is properly packaged for distribution."
    },
    {
      title: "Distribution",
      description: "Through our network of community partners, we efficiently distribute food to those who need it most."
    }
  ];
</script>

<div class="max-w-6xl mx-auto p-6 space-y-16">
  <!-- Hero Section -->
  <div class="text-center space-y-6 py-12">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
      Making Food Distribution
      <span class="text-blue-600"> Efficient & Accessible</span>
    </h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      We're bridging the gap between surplus food and those in need, creating a more 
      sustainable and equitable food system for everyone.
    </p>
  </div>

  <!-- Impact Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each impactStats as stat}
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex flex-col items-center space-y-2">
          <svelte:component this={stat.icon} class="w-8 h-8 text-blue-600" />
          <h3 class="text-3xl font-bold">{stat.number}</h3>
          <p class="text-gray-600">{stat.label}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Mission Section -->
  <div class="space-y-6">
    <h2 class="text-3xl font-bold">Our Mission</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <p class="text-gray-600">
          Our mission is to revolutionize food distribution by creating an efficient 
          bridge between surplus food and communities in need. We leverage technology 
          and community engagement to reduce food waste while ensuring no one goes hungry.
        </p>
        <p class="text-gray-600">
          Through our platform, we're making it easier than ever for restaurants, 
          grocers, and individuals to donate surplus food, and for those in need 
          to access it with dignity and convenience.
        </p>
      </div>
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <h3 class="font-semibold mb-4">Why It Matters</h3>
        <ul class="space-y-3">
          {#each [
            "40% of food in the US goes to waste while millions face food insecurity",
            "Traditional food distribution methods are often inefficient and time-consuming",
            "Many people lack easy access to food assistance programs"
          ] as point}
            <li class="flex items-start gap-2">
              <ArrowRight class="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <span class="text-gray-600">{point}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <hr class="border-t border-gray-200" />

  <!-- How It Works -->
  <div class="space-y-8">
    <h2 class="text-3xl font-bold">How It Works</h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#each processSteps as step, index}
        <div class="relative bg-white rounded-lg border shadow-sm p-6">
          <div class="space-y-4">
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Step {index + 1}
            </span>
            <h3 class="text-xl font-semibold">{step.title}</h3>
            <p class="text-gray-600">{step.description}</p>
          </div>
          {#if index < processSteps.length - 1}
            <div class="hidden md:block absolute top-20 right-0 translate-x-1/2">
              <ArrowRight class="w-6 h-6 text-gray-300" />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Get Involved CTA -->
  <div class="bg-blue-50 rounded-2xl p-8 text-center space-y-6">
    <h2 class="text-3xl font-bold">Get Involved</h2>
    <p class="text-gray-600 max-w-2xl mx-auto">
      Whether you're a business looking to donate surplus food, a volunteer wanting 
      to make a difference, or someone who can help support our mission, we'd love 
      to hear from you.
    </p>
    <div class="flex justify-center gap-4 flex-wrap">
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Donate Food
      </button>
      <button class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
        Volunteer With Us
      </button>
    </div>
  </div>
</div>