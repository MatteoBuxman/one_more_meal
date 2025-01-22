<script>
  import { Package } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-background p-3 flex flex-col items-center">
  <!-- Main Content -->
  <div class="w-full max-w-2xl mt-4">
    <!-- Header -->
    <div class="text-center space-y-4 mb-8">
      <Package class="w-16 h-16 mx-auto text-primary" />
      <h1 class="text-4xl font-bold tracking-tight">Store Coming Soon</h1>
      <p class="text-lg text-muted-foreground">
        Your one-stop shop for smart prelabeled packaging solutions
      </p>
    </div>

    <!-- Product Info Card -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-3 space-y-1.5">
        <h3 class="text-2xl font-semibold">OneMoreMeal Packaging</h3>
        <p class="text-sm text-muted-foreground">
          Biodegradeable packaging with pre-equipped QR codes.
        </p>
      </div>
      <div class="p-3 pt-0 space-y-4">
        <div>
          <h3 class="font-medium mb-2">What we'll offer:</h3>
          <div class="space-y-3 text-muted-foreground">
            <p>
              Our packaging comes pre-equipped with unique QR codes, making product 
              tracking and inventory management seamless. Each meal package is ready to 
              use upon arrival which means you do not have to bother with printing and sticking your own QR codes on the box.
            </p>
            <p>
              Every QR code is uniquely identifiable and integrated into our system, 
              allowing for instant product recognition and tracking throughout the 
              distribution process.
            </p>
            <p>
              This packaging is also made of fully biodegradeable material so wherever it ends up, it will not damage the environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>