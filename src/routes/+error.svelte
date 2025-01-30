<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Home } from "lucide-svelte";
</script>

<div class="h-screen w-full flex flex-col items-center justify-center">
  <!-- Main Content -->
  <div class="text-center space-y-5 p-6 max-w-md">
    <!-- 404 Text -->
    <h1 class="text-8xl font-bold text-gray-900">404</h1>

    <!-- Message -->
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold tracking-tight">Page not found</h2>
      <p class="text-gray-500">
        Sorry, we couldn't find the page you're looking for. Please check the
        URL or try navigating back.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 pt-6 justify-center">
      <a href="/dashboard">
        <Button>
          <Home class="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </a>
    </div>
  </div>
</div>
