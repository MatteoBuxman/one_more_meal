<!-- Footer.svelte -->
<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
    import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-svelte';
  
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="bg-slate-950 text-slate-200 py-12 mt-5">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">OneMoreMeal</h3>
          <p class="text-sm text-slate-400">Feed someone else.</p>
          <div class="flex space-x-4">
            <Facebook class="w-5 h-5 hover:text-blue-400 cursor-pointer" />
            <Twitter class="w-5 h-5 hover:text-blue-400 cursor-pointer" />
            <Instagram class="w-5 h-5 hover:text-pink-400 cursor-pointer" />
            <Github class="w-5 h-5 hover:text-slate-400 cursor-pointer" />
          </div>
        </div>
  
        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/" class="text-sm hover:text-slate-400 transition-colors">Home</a></li>
            <li><a href="/about" class="text-sm hover:text-slate-400 transition-colors">About Us</a></li>
            <li><a href="/services" class="text-sm hover:text-slate-400 transition-colors">Services</a></li>
            <li><a href="/contact" class="text-sm hover:text-slate-400 transition-colors">Contact</a></li>
          </ul>
        </div>
  
  
        <!-- Contact Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Mail class="w-4 h-4" />
              <span class="text-sm">contact@company.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <Phone class="w-4 h-4" />
              <span class="text-sm">+1 (555) 123-4567</span>
            </div>
            <div class="flex items-center space-x-2">
              <MapPin class="w-4 h-4" />
              <span class="text-sm">123 Business St, City, Country</span>
            </div>
          </div>
        </div>
      </div>
  
      <Separator class="my-8 bg-slate-800" />
  
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-sm text-slate-400">
          © {currentYear} Company Name. All rights reserved.
        </p>
        <div class="flex space-x-4">
          <a href="/privacy" class="text-sm text-slate-400 hover:text-slate-200">Privacy Policy</a>
          <a href="/terms" class="text-sm text-slate-400 hover:text-slate-200">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>